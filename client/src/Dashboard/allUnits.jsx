import React from "react";
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
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { units } from "../data/computerData";
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar />
        </div>
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
            <div className="max-h-full mt-4">
              <div>
                <TableContainer className="bg-white shadow-md rounded-lg">
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
                      {units.map((unit, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{unit.unit}</TableCell>
                          <TableCell align="center">{unit.category}</TableCell>
                          <TableCell align="center">{unit.status}</TableCell>
                          <TableCell align="center">
                            <Button onClick={handleClickOpen}>
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />
                            </Button>
                          </TableCell>
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
                                <Typography
                                  sx={{ ml: 2, flex: 1 }}
                                  variant="h6"
                                  component="div"
                                >
                                  {unit.unit} - {unit.category}
                                </Typography>
                                {/* <Button
                                  autoFocus
                                  color="inherit"
                                  onClick={handleClose}
                                >
                                  save
                                </Button> */}
                              </Toolbar>
                            </AppBar>
                            <TableContainer
                              className="w-full bg-white shadow-md rounded-lg"
                              style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", marginTop: "50px" }}
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
                                    <TableRow>
                                        <TableCell align="center">
                                            {unit.status}
                                        </TableCell>
                                        <TableCell align="center">
                                            {unit.recent}
                                        </TableCell>
                                        <TableCell align="center">
                                            {unit.date}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Dialog>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUnits;
