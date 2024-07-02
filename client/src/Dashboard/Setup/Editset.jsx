import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { format } from "date-fns";

function EditSet({ isOpen, onClose, row, editPopupData, setEditPopupData }) {
  const [user, setUser] = useState("");
  const [rows, setRows] = useState([]);
  const [computerUser, setComputerUser] = useState({ data: [] });
  const [computer, setComputer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [computerName, setComputerName] = useState("");
  useEffect(() => {
    // Flatten units from each computer into rows
    if (Array.isArray(editPopupData.computers)) {
      const allUnits = editPopupData.computers.flatMap((computer) =>
        computer.units.map((unit) => ({
          ...unit,
          computerName: computer.name,
        }))
      );
      setRows(allUnits);
      const name = editPopupData.name;
      setComputerName(name);
      setLoading(false);
    }
  }, [editPopupData]);
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
        setComputerUser(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchComputerUser();
  }, [computerUser]);

  const ComputerUser =
    computerUser.data && computerUser.data.length > 0
      ? computerUser.data.map((cu) => ({
          id: cu.id,
          name: cu.name,
        }))
      : [];

  // Function to delete a row
  const handleDelete = (index) => {
    if (!Array.isArray(rows)) {
      console.error("Rows is not an array");
      return;
    }

    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmitEditedSet = async (event, unitId) => {
    event.preventDefault();

    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          Transfer: "Tranfer",
          Defective: "Defective",
        });
      }, 1000);
    });

    const { value: reason } = await Swal.fire({
      title: "Why did you delete this unit?",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "You need to indicate the reason!";
        }
      },
    });

    if (reason) {
      try {
        const response = await axios.delete(
          `api/computer/${computer.id}/unit/${unitId}`,
          {
            assignedUser: user,
            rows: rows,
            reason: reason,
          }
        );

        if (response.data.status === true) {
          Swal.fire({
            icon: "success",
            position: "center",
            title: "Computer set has been saved!",
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2500,
          }).then(function () {
            window.location = "/add";
          });
        }
        console.log("Saving computer set:", response.data);
      } catch (error) {
        console.error("Error in saving computer set:", error);
        if (error.response && error.response.data) {
          console.log("Backend error response:", error.response.data);
        } else {
          console.log("ERROR!");
        }
      }
    }
  };

  /*
  const handleSubmitEditedSet = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.put('api/insertApiForComputerSet', {
        units: units,
        user: user
      });
      if (response.data.status === true){
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          }).then(function(){
          window.location = "/set";
        });
      }
      console.log('Updating computer set:', response.data);
    }catch(error) {
      console.log('Error in adding user:', error);
      if(error.response && error.response.data){
        console.log('Backend error response:', error.response.data);
      } else{
        console.log('ERROR!');
      }
    }finally{

    }
  }; */

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
        <div
          className="bg-white shadow-md rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl"
          style={{ minWidth: "1000px", maxWidth: "100vh", maxHeight: "100vh" }}
        >
          <div className="max-h-screen overflow-y-scroll text-justify">
            <form onSubmit={handleSubmitEditedSet}>
              <p className="p-5 text-4xl text-center">
                <u>
                  <strong>{computerName}</strong> computer units.
                </u>
              </p>
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
                        <Typography variant="subtitle1" fontWeight="bold">
                          UNIT CODE
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          DATE OF PURCHASE
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          CATEGORY
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          DESCRIPTION
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          SUPPLIER
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          SERIAL NO.
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          STATUS
                        </Typography>
                      </TableCell>
                      <TableCell align="center"></TableCell>
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
                      rows.map((unit, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{unit.unit_code}</TableCell>
                          <TableCell align="center">
                            {format(
                              new Date(unit.date_of_purchase),
                              "yyyy-MM-dd"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {unit.category.category_name}
                          </TableCell>
                          <TableCell align="center">
                            {unit.description}
                          </TableCell>
                          <TableCell align="center">
                            {unit.supplier.supplier_name}
                          </TableCell>
                          <TableCell align="center">
                            {unit.serial_number}
                          </TableCell>
                          <TableCell align="center">{unit.status}</TableCell>
                          <TableCell align="center">
                            <button
                              onClick={handleDelete}
                              className="text-base font-semibold text-red-600"
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex items-center justify-center">
                <div className="flex-none">
                  <Autocomplete
                    freeSolo
                    id="user"
                    disableClearable
                    options={ComputerUser}
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    readOnly={ComputerUser.length === 0}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label={
                          ComputerUser.length === 0
                            ? "No user to select"
                            : "Assign User"
                        }
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
                    value={
                      ComputerUser.find(
                        (option) => option.id === computer.computer_user
                      ) || {}
                    }
                    onChange={(event, newValue) => {
                      setComputer({ ...computer, computer_user: newValue.id });
                    }}
                  />
                </div>
                <div className="items-center justify-center flex-1 text-center">
                  <button
                    className="w-24 h-8 text-sm font-semibold bg-gray-200 rounded-full"
                    onClick={onClose}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="w-24 h-8 ml-3 text-sm font-semibold text-white bg-green-600 rounded-full"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSet;
