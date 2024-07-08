import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography, TablePagination, TextField } from "@mui/material";
import Add from "./Add";
import EditSet from "./Editset";
import axios from "../../api/axios";
import { format } from "date-fns";
import Swal from "sweetalert2";

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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Set() {
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const classes = useStyles();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editPopupData, setEditPopupData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [computerUser, setComputerUser] = useState([]);
  const [computerSetRefresh, setComputerSetRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComputerUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get("/api/computer-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComputerUser(response.data.hasComputerSet);
        setFilteredData(response.data.hasComputerSet);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching computer users:", error);
      }
    };

    fetchComputerUser();
  }, [computerSetRefresh]);

  useEffect(() => {
    filterData(searchTerm);
  }, [computerUser]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    if (!value.trim()) {
      setFilteredData(computerUser);
    } else {
      const filtered = computerUser.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setPage(0);
  };

  const openAddPopup = () => {
    setAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setAddPopupOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEditPopup = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`/api/computer-user-edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setEditPopupData(response.data.computer_user_data);
        setIsEditPopupOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setEditPopupData(false);
  };

  const rows = filteredData;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar />
        </div>
        <div style={{ flex: 2, paddingBottom: "50px" }}>
          <p className="pt-10 ml-10 text-2xl font-normal">Setup Computer Set</p>
          <p className="ml-10 text-lg font-light">
            <Link to="/dashboard" className="text-blue-800">
              Home
            </Link>{" "}
            &gt; Setup
          </p>
          <br /> <br />
          <div className="flex items-center justify-center mr-10">
            <div className="flex justify-end flex-grow">
              <div className="z-0 mr-5">
                <TextField
                  label="Search User"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  variant="outlined"
                  fullWidth
                  sx={{ width: 300 }}
                  size="small"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="mt-3.5">
                <button
                  onClick={openAddPopup}
                  className="pt-2 pb-2 pl-4 pr-4 text-base font-semibold text-white bg-red-400 border border-transparent rounded-full"
                >
                  Assign Computer Set User
                </button>
              </div>
            </div>
            <Add
              isOpen={isAddPopupOpen}
              onClose={closeAddPopup}
              onSubmit={setComputerSetRefresh}
            />
          </div>
          <div className="flex items-center justify-center mt-5 ml-10 mr-10">
            <div className="z-0 w-full max-h-max rounded-xl">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow className="bg-red-200">
                      <TableCell align="center">
                        <p className="text-base font-semibold">ID</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">
                          DATE OF PURCHASE
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">CATEGORY</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">DESCRIPTION</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">SUPPLIER</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">SERIAL NO.</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">STATUS</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="text-base font-semibold">USERS</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8}>
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-full p-4 rounded">
                              <div className="flex space-x-4 animate-pulse">
                                <div className="flex-1 py-1 space-y-6">
                                  <div className="h-10 bg-gray-200 rounded shadow"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows
                        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                        .map((row, rowIndex) => (
                          <TableRow key={`${row.id}-${rowIndex}`}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">
                              {row.computers.map((computer) =>
                                computer.units.map((unit, index) => (
                                  <React.Fragment key={index}>
                                    <div>
                                      {format(
                                        new Date(unit.date_of_purchase),
                                        "yyyy-MM-dd"
                                      )}
                                    </div>
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.computers.map((computer) =>
                                computer.units.map((unit, index) => (
                                  <React.Fragment key={index}>
                                    <div>{unit.category.category_name}</div>
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.computers.map((computer) =>
                                computer.units.map((unit, index) => (
                                  <React.Fragment key={index}>
                                    <div>{unit.description}</div>
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.computers.map((computer) =>
                                computer.units.map((unit, index) => (
                                  <React.Fragment key={index}>
                                    <div>{unit.supplier.supplier_name}</div>
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.computers.map((computer) =>
                                computer.units.map((unit, index) => (
                                  <React.Fragment key={index}>
                                    <div>{unit.serial_number}</div>
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.computers.map((computer) =>
                                computer.units.map((unit, index) => (
                                  <React.Fragment key={index}>
                                    <div>{unit.status}</div>
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <button onClick={() => openEditPopup(row.id)}>
                                {row.name}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                    {loading
                      ? ""
                      : emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={8}>
                              {rows.length === 0 ? (
                                !searchTerm ? (
                                  <p className="text-xl text-center">
                                    No user has an assigned computer set.
                                  </p>
                                ) : (
                                  <p className="text-xl text-center">
                                    No "{searchTerm}" result found.
                                  </p>
                                )
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 15, 20, 25]}
                  component="div"
                  count={rows.length}
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
              {isEditPopupOpen && (
                <EditSet
                  isOpen={isEditPopupOpen}
                  onClose={closeEditPopup}
                  row={selectedRow}
                  editPopupData={editPopupData}
                  setEditPopupData={setEditPopupData}
                  onSubmit={setComputerSetRefresh}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Set;
