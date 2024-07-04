import React, { useState, useEffect } from "react";
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
import { format } from "date-fns";

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

  const handleEditClick = (id) => {
    setIsEditOpen(true);
  };
  const fstatus = viewPopupData.computers.map(
    (fstatus) => fstatus.formatted_status
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40" onClick={onClose}>
      <div
        className="bg-white shadow-md rounded-2xl"
        style={{ maxWidth: "100vh", minWidth: "1000px", maxHeight: "100vh" }}
      >
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
            <p>Computer ID: {id.length === 1 ? id : "NaN"}</p>
            <p className="text-base">
              Total Format:{" "}
              {fstatus[0] === 0
                ? "No formatting has been applied yet."
                : fstatus}
            </p>
          </div>
        </div>
        <div
          className="mt-6 mb-4 ml-6 mr-6 overflow-y-scroll text-justify"
          style={{ height: "470px" }}
        >
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
                    {/* {viewPopupData.computers.flatMap((comp) =>
                      comp.recent_users.map((recent, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            <Typography variant="subtitle1" fontWeight="medium">
                              {recent.unit.unit_code}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle1" fontWeight="medium">
                              {recent.unit.category.category_name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle1" fontWeight="medium">
                              {recent.unit.status}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle1" fontWeight="medium">
                              {recent.computer_user.name}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    )} */}
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        <p className="text-center">
                          {rows.length === 0
                            ? "This user has no computer units"
                            : ""}
                        </p>
                      </TableCell>
                    </TableRow>
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
                          Installed Applications
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {Array.isArray(viewPopupData.computers) ? (
                          <div>
                            <ul>
                              {showAll
                                ? viewPopupData.computers.flatMap((item, idx) =>
                                    item.installed_applications.map((item) => (
                                      <li key={idx}>
                                        {item.application_content}
                                      </li>
                                    ))
                                  )
                                : viewPopupData.computers
                                    .slice(0, 3)
                                    .flatMap((item, idx) =>
                                      item.installed_applications.map(
                                        (item) => (
                                          <li key={idx}>
                                            {item.application_content}
                                          </li>
                                        )
                                      )
                                    )}
                            </ul>
                            {viewPopupData.computers.length > 3 && !showAll && (
                              <button onClick={handleViewMore}>
                                <u>View More</u>
                              </button>
                            )}
                          </div>
                        ) : (
                          <span>{viewPopupData.computers}</span>
                        )}
                        <p>
                          {viewPopupData.computers.flatMap((item, idx) =>
                            item.installed_applications.length === 0
                              ? "No installed applications yet."
                              : ""
                          )}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="medium">
                          Remarks
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {Array.isArray(viewPopupData.computers) ? (
                          <div>
                            <ul>
                              {showAll
                                ? viewPopupData.computers.flatMap((item, idx) =>
                                    item.remarks.map((item) => (
                                      <li key={idx}>{item.remark_content}</li>
                                    ))
                                  )
                                : viewPopupData.computers
                                    .slice(0, 3)
                                    .flatMap((item, idx) =>
                                      item.remarks.map((item) => (
                                        <li key={idx}>
                                          <div className="p-2 mb-1 border rounded-lg">
                                            <div>
                                              {format(
                                                new Date(item.date),
                                                "MMMM dd, yyyy"
                                              )}
                                            </div>
                                            {item.remark_content
                                              .split("\n")
                                              .map((line, lineIndex) => (
                                                <div key={lineIndex}>
                                                  {line}
                                                </div>
                                              ))}
                                          </div>
                                        </li>
                                      ))
                                    )}
                            </ul>
                            {viewPopupData.computers.length > 3 && !showAll && (
                              <button onClick={handleViewMore}>
                                <u>View More</u>
                              </button>
                            )}
                          </div>
                        ) : (
                          <span>{viewPopupData.computers}</span>
                        )}
                        <p>
                          {viewPopupData.computers.flatMap((item, idx) =>
                            item.remarks.length === 0 ? "No remarks yet." : ""
                          )}
                        </p>
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
