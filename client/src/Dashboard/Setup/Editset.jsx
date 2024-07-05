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
  Button,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { format } from "date-fns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function EditSet({ isOpen, onClose, row, editPopupData, setEditPopupData }) {
  const [user, setUser] = useState("");
  const [rows, setRows] = useState([]);
  const [computerUser, setComputerUser] = useState({ data: [] });
  const [computer, setComputer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [computerName, setComputerName] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  if (!isOpen) {
    return null;
  }

  const handleSubmitEditedSet = async (event, unitId) => {
    event.preventDefault();

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
      } else if (computerUser) {
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
          <div className="max-h-screen overflow-y-auto text-justify">
            <form onSubmit={handleSubmitEditedSet}>
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
                            <Checkbox />
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Why did you remove this unit?
                                </Typography>
                                <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                      State the reason of deletion...
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={reason}
                                      label="State the reason of deletion..."
                                      onChange={(e) =>
                                        setReason(e.target.value)
                                      }
                                    >
                                      <MenuItem value="Transfer">
                                        Transfer
                                      </MenuItem>
                                      <MenuItem value=" Defective">
                                        Defective
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                                {reason === "Transfer" && (
                                  <Box style={{ marginTop: "10px" }}>
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
                                              : "Assign New User"
                                          }
                                          InputProps={{
                                            ...params.InputProps,
                                            type: "search",
                                          }}
                                          variant="outlined"
                                          style={{
                                            marginTop: "10px",
                                            marginBottom: "10px",
                                            marginRight: "400px",
                                          }}
                                          sx={{ minWidth: 120 }}
                                        />
                                      )}
                                      value={
                                        ComputerUser.find(
                                          (option) =>
                                            option.id === computer.computer_user
                                        ) || {}
                                      }
                                      onChange={(event, newValue) => {
                                        setComputer({
                                          ...computer,
                                          computer_user: newValue.id,
                                        });
                                      }}
                                    />
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DemoContainer
                                        components={["DatePicker"]}
                                      >
                                        <DatePicker label="Date of Transfer" />
                                      </DemoContainer>
                                    </LocalizationProvider>
                                  </Box>
                                )}
                                <Grid className="mt-5">
                                  <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    style={{
                                      backgroundColor: "gray",
                                      marginRight: "10px",
                                    }}
                                  >
                                    CANCEL
                                  </Button>
                                  <Button
                                    onClick={handleClose}
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                  >
                                    SAVE
                                  </Button>
                                </Grid>
                              </Box>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      ))
                    )}

                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex items-center justify-center">
                <p className="p-5 text-xl text-center">
                  <strong>{computerName}&apos;s</strong> Computer Units
                </p>
                <div className="items-end justify-end flex-1 ml-48 text-center">
                  <button
                    className="w-24 h-8 text-sm font-semibold bg-gray-200 rounded-full"
                    onClick={onClose}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleOpen}
                    className="w-24 h-8 ml-3 text-sm font-semibold text-white bg-red-600 rounded-full"
                  >
                    REMOVE
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
