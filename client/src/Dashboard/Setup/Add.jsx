import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import { TablePagination } from "@material-ui/core";
import { userData } from "../../data/userAddData";
import { data } from "../../data/vacantUnitsData";
import Swal from "sweetalert2";
import axios from "../../api/axios";

function Add({ isOpen, onClose }) {
  const [user, setUser] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [checkedRows, setCheckedRows] = useState([]);

  const handleCheckboxClick = (index) => {
    if (checkedRows.includes(index)) {
      setCheckedRows(checkedRows.filter((item) => item !== index));
    } else {
      setCheckedRows([...checkedRows, index]);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    if (!value.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.category.toLowerCase().includes(value.toLowerCase()) ||
          item.unit.toLowerCase().includes(value.toLowerCase()) ||
          item.supplier.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  if (!isOpen) {
    return null;
  }

  const handleSubmitAssignedUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("api/insertApiForAssignedUser", {
        assignedUser: user,
        checkedRows: checkedRows,
      });
      if (response.data.status === true) {
        Swal.fire({
          icon: "success",
          position: "center",
          title: "New computer set added!",
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2500,
        }).then(function () {
          window.location = "/add";
        });
      }
      console.log("Adding computer set:", response.data);
    } catch (error) {
      console.error("Error in adding computer set:", error);
      if (error.response && error.response.data) {
        console.log("Backend error response:", error.response.data);
      } else {
        console.log("ERROR!");
      }
    } finally {
    }
  };

  return (
    <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-md"
        style={{ minWidth: "1100px", maxWidth: "100vh", maxHeight: "100vh" }}
      >
        <div className="text-justify">
          <form onSubmit={handleSubmitAssignedUser}>
            <div className="flex-none">
              <TableContainer
                component={Paper}
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow className="bg-red-200">
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          UNIT CODE
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          DATE OF PURCHASE
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          CATEGORY
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          DESCRIPTION
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          SUPPLIER
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          SERIAL NO.
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 700 }}
                        >
                          STATUS
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          label="Search Unit"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          variant="outlined"
                          fullWidth
                          sx={{ width: 100 }}
                          size="small"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((data, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{data.unit}</TableCell>
                          <TableCell align="center">{data.dop}</TableCell>
                          <TableCell align="center">{data.category}</TableCell>
                          <TableCell align="center">
                            {data.description}
                          </TableCell>
                          <TableCell align="center">{data.supplier}</TableCell>
                          <TableCell align="center">{data.serial}</TableCell>
                          <TableCell align="center">{data.status}</TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={checkedRows.includes(index)}
                              onChange={() => handleCheckboxClick(index)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) =>
                    handleChangePage(event, newPage)
                  }
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={
                    <Typography variant="subtitle" fontWeight={600}>
                      Entries Per Page:{" "}
                    </Typography>
                  }
                />
              </TableContainer>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex-none">
                <Autocomplete
                  freeSolo
                  id="user"
                  disableClearable
                  options={userData.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      required
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      {...params}
                      label="Assign User"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      variant="outlined"
                      style={{
                        marginLeft: "20px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        marginRight: "400px",
                        width: "300px",
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex-1 justify-center items-center text-center">
                <button
                  className="bg-gray-200 h-8 w-24 rounded-full font-semibold text-sm"
                  onClick={onClose}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-green-600 h-8 w-24 text-white rounded-full ml-3 text-sm font-semibold"
                >
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
