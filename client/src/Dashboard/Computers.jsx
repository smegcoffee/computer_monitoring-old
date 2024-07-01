import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faGears,
  faQrcode,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Specs from "./PopupForComputers/Specs";
import View from "./PopupForComputers/View";
import QrCode from "./PopupForComputers/Qr";
import axios from "../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
  TextField,
} from "@mui/material";
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

//THIS IS THE TABLE LIST OF COMPUTERS
export const TableComponent = () => {
  const [isSpecsPopupOpen, setSpecsPopupOpen] = useState(false);
  const [isViewPopupOpen, setViewPopupOpen] = useState(false);
  const [isQrPopupOpen, setQrPopupOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [specsPopupData, setSpecsPopupData] = useState("");
  const [viewPopupData, setViewPopupData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [computerUser, setComputerUser] = useState([]);
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
        const data = response.data.data;
        const userData = data.map((user) => ({
          ...user,
          action: ["Specs", "View", "Qr"],
        }));

        setComputerUser(userData);
        setFilteredData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching computer users:", error);
      }
    };

    fetchComputerUser();
  }, []);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openSpecsPopup = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`/api/computer-user-specs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setSpecsPopupData(response.data.computer_user_specs);
        setSpecsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openViewPopup = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`/api/computer-user-specs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setViewPopupData(response.data.computer_user_specs);
        setViewPopupOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openQrPopup = (data) => {
    setQrCodeData(data);
    setQrPopupOpen(true);
  };

  const closeSpecsPopup = () => {
    setSpecsPopupOpen(false);
    setSpecsPopupData(false);
  };

  const closeViewPopup = () => {
    setViewPopupOpen(false);
    setViewPopupData(false);
  };

  const closeQrPopup = () => {
    setQrPopupOpen(false);
  };

  const openSpecsData = (computerUser) => {
    return {
      id: computerUser.id,
      name: computerUser.name,
      units: computerUser.units,
    };
  };

  const openViewData = (computerUser) => {
    return {
      units: computerUser.units,
      branchCode: computerUser.branchCode,
      name: computerUser.name,
      position: computerUser.position,
      id: computerUser.id,
      category2: computerUser.category2,
      description: computerUser.description,
      remarks: computerUser.remarks,
      information: computerUser.information,
    };
  };

  const generateQRCodeData = (computerUser) => {
    return {
      id: computerUser.id,
      data: `${computerUser.id}`,
    };
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, computerUser.length - page * rowsPerPage);
  return (
    <>
      {/* search thru NAME */}
      <div className="flex mb-5">
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
      <TableContainer component={Paper} className="w-full table-container">
        <Table>
          <TableHead>
            <TableRow className="bg-blue-200">
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  ID
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Branch Code
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Name and Position
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
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
              filteredData
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                      {row.branch_code.branch_name}
                    </TableCell>
                    <TableCell align="center">
                      <b>{row.name}</b>
                      <br />
                      <i>{row.position.position_name}</i>
                    </TableCell>
                    <TableCell align="center">
                      {row.action.includes("Specs") && (
                        <Button
                          className="hover:text-blue-500"
                          onClick={() => openSpecsPopup(row.id)}
                        >
                          <FontAwesomeIcon icon={faGears} />
                        </Button>
                      )}

                      {row.action.includes("View") && (
                        <Button
                          className="hover:text-blue-500"
                          onClick={() => openViewPopup(row.id)}
                        >
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Button>
                      )}
                      {row.action.includes("Qr") && (
                        <Button
                          className="hover:text-blue-500"
                          onClick={() => openQrPopup(generateQRCodeData(row))}
                        >
                          <FontAwesomeIcon icon={faQrcode} />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
            {loading
              ? ""
              : emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6}>
                      {filteredData.length === 0 ? (
                        !searchTerm ? (
                          <p className="text-xl text-center">
                            No user to manage.
                          </p>
                        ) : (
                          <p className="text-xl text-center">
                            No "{searchTerm}" result found.
                          </p>
                        )
                      ) : (
                        ""
                      )}{" "}
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 15, 20, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => handleChangePage(event, newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={
            <Typography variant="subtitle" fontWeight={600}>
              Entries Per Page:
            </Typography>
          }
        />
      </TableContainer>
      <Specs
        isOpen={isSpecsPopupOpen}
        onClose={closeSpecsPopup}
        specsPopupData={specsPopupData}
        setSpecsPopupData={setSpecsPopupData}
      />
      <View
        isOpen={isViewPopupOpen}
        onClose={closeViewPopup}
        viewPopupData={viewPopupData}
        setViewPopupData={setViewPopupData}
      />
      <QrCode
        isOpen={isQrPopupOpen}
        onClose={closeQrPopup}
        qrCodeData={qrCodeData}
      />
    </>
  );
};

function Computers() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar />
        </div>
        <div style={{ flex: 2, paddingBottom: "50px", marginRight: "80px" }}>
          <p className="pt-10 ml-10 text-2xl font-normal">Managed Computers</p>
          <p className="ml-10 text-lg font-light">
            <Link to="/dashboard" className="text-blue-800">
              Home
            </Link>{" "}
            &gt; Computers
          </p>
          <br /> <br />
          <div className="w-full h-full ml-10">
            <div className="w-full max-h-full mt-4">
              <div>
                <TableComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Computers;
