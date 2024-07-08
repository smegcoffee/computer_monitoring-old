import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        await axios.get("/api/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        window.location = "/login";
      } catch (error) {
        console.error("Error logging out:", error);
        Swal.fire("Error!", "Failed to log out. Please try again.", "error");
      }
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full h-20 bg-blue-800">
        <div className="flex-grow text-center">
          <p className="text-4xl font-bold text-white">
            COMPUTER MONITORING SYSTEM
          </p>
        </div>
        <Link onClick={handleLogout}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="mr-8 text-white"
          />{" "}
        </Link>
      </div>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AllUnits() {
  const [open, setOpen] = useState(false);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get("/api/units", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const unit = response.data.data;

        setUnits(unit);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchUnits();
  }, []);

  const handleClickOpen = (unit) => {
    setSelectedUnit(unit);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUnit(null);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, units.length - page * rowsPerPage);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <div style={{ flex: 2, paddingBottom: "50px" }}>
          <p className="pt-10 ml-10 text-2xl font-normal">All Units</p>
          <p className="ml-10 text-lg font-light">
            <Link to="/dashboard" className="text-blue-800">
              Home
            </Link>{" "}
            &gt; All Units
          </p>
          <br /> <br />
          <div className="h-full ml-10 mr-10">
            <TableContainer className="bg-white rounded-lg shadow-md">
              <Table>
                <TableHead>
                  <TableRow className="bg-blue-400">
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={"white"}
                      >
                        UNIT CODE
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={"white"}
                      >
                        CATEGORY
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={"white"}
                      >
                        STATUS
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={"white"}
                      >
                        ACTION
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {units && units.length > 0 ? (
                    units
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((unit, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{unit.unit_code}</TableCell>
                        <TableCell align="center">
                          {unit.category.category_name}
                        </TableCell>
                        <TableCell align="center">{unit.status}</TableCell>
                        <TableCell align="center">
                          <Button onClick={() => handleClickOpen(unit)}>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No units found.
                      </TableCell>
                    </TableRow>
                  )}
            {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4}>
                    </TableCell>
                  </TableRow>
                )}
                </TableBody>
              </Table>
                <TablePagination
                  rowsPerPageOptions={[ 10, 15, 20]}
                  component="div"
                  count={units.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={
                    <Typography variant="subtitle" fontWeight={600}>
                      Entries Per Page:
                    </Typography>
                  }
                />
            </TableContainer>
          </div>
        </div>
      </div>
      {selectedUnit && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {selectedUnit.unit_code} - {selectedUnit.category.category_name}
              </Typography>
            </Toolbar>
          </AppBar>
          <TableContainer
            className="w-full bg-white rounded-lg shadow-md"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow className="bg-red-400">
                  <TableCell align="center">
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color={"white"}
                    >
                      STATUS
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color={"white"}
                    >
                      RECENT USER
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color={"white"}
                    >
                      DATE OF TRANSFER
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUnit && selectedUnit.transfer_units.length > 0 ? (
                  selectedUnit.transfer_units.map((transfer, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{transfer.status}</TableCell>
                      <TableCell align="center">
                        {transfer.recent_user}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(
                          transfer.date_of_transfer
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      No data found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Dialog>
      )}
    </div>
  );
}

export default AllUnits;
