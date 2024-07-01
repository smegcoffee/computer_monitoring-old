import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import smct from "./../../img/smct.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import EditView from "./Editview";

function View({ isOpen, onClose, viewPopupData, setViewPopupData }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if (viewPopupData?.computers) {
      const specsData = viewPopupData.computers.flatMap((computer) =>
        computer.units.map((unit) => ({
          ...unit,
          computerName: computer.name,
        }))
      );
      setRows(specsData);

      const ids = viewPopupData.computers.map((comp) => comp.id);
      setId(ids);
    }
  }, [viewPopupData]);

  const handleViewMore = () => {
    setShowAll(true);
  };

  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div
        className="overflow-y-scroll bg-white shadow-md rounded-2xl"
        style={{ maxWidth: "100vh", minWidth: "1000px", maxHeight: "100vh" }}
      >
        <span
          className="absolute p-2 text-white cursor-pointer top-5 right-5"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} className="w-6 h-6" />
        </span>
        <div className="flex p-5 bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max">
          <div className="flex-none">
            <img
              src={smct}
              alt="SMCT Logo"
              className="block h-24 m-0 w-60"
            ></img>
          </div>
          <div className="flex-none mt-4 ml-10 text-lg text-justify text-white">
            <p>
              <b>BRANCH CODE: </b>
              {viewPopupData.branch_code.branch_name}
            </p>
            <p>
              <b>NAME OF USER: </b>
              {viewPopupData.name}
            </p>
            <p>
              <b>DESIGNATION: </b>
              {viewPopupData.position.position_name}
            </p>
          </div>
          <div className="flex-1 text-3xl font-medium text-center text-white mt-7">
            Computer ID: {id.length === 1 ? id : "NaN"}
          </div>
        </div>
        <div className="mt-6 mb-4 ml-6 mr-6 text-justify">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow className="bg-blue-300">
                      <TableCell>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          fontWeight="bold"
                        >
                          UNIT CODE
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          fontWeight="bold"
                        >
                          CATEGORY
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          fontWeight="bold"
                        >
                          STATUS
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          fontWeight="bold"
                        >
                          RECENT USER
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((unit, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <Typography variant="subtitle1" fontWeight="medium">
                            {unit.unit_code}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle1" fontWeight="medium">
                            {unit.category.category_name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle1" fontWeight="medium">
                            {unit.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle1" fontWeight="medium">
                            {viewPopupData.name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow className="bg-red-300">
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          DEVICE INFORMATION
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          DETAILS
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {viewPopupData.category2}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {/* {Array.isArray(viewPopupData.description) ? (
                          <div>
                            <ul>
                              {showAll
                                ? viewPopupData.description.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))
                                : viewPopupData.description
                                    .slice(0, 3)
                                    .map((item, idx) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                            </ul>
                            {viewPopupData.description.length > 3 &&
                              !showAll && (
                                <button onClick={handleViewMore}>
                                  {" "}
                                  <u>View More</u>
                                </button>
                              )}
                          </div>
                        ) : (
                          <span>{viewPopupData.description}</span>
                        )} */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {viewPopupData.remarks}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {/* {Array.isArray(viewPopupData.information) ? (
                          <div>
                            <ul>
                              {showAll
                                ? viewPopupData.information.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))
                                : viewPopupData.information
                                    .slice(0, 3)
                                    .map((item, idx) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                            </ul>
                            {viewPopupData.information.length > 3 &&
                              !showAll && (
                                <button onClick={handleViewMore}>
                                  {" "}
                                  <u>View More</u>
                                </button>
                              )}
                          </div>
                        ) : (
                          <span>{viewPopupData.information}</span>
                        )} */}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
        <div className="flex items-center justify-center pt-10 pb-10 text-center">
          <button
            className="mr-16 text-xl text-black bg-gray-300 rounded-3xl h-9 w-36"
            onClick={handleEditClick}
          >
            EDIT
          </button>
          <button className="text-xl text-white bg-blue-500 rounded-3xl h-9 w-36">
            PRINT
          </button>
        </div>
        {isEditOpen && (
          <EditView
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            viewPopupData={viewPopupData}
          />
        )}
      </div>
    </div>
  );
}

export default View;
