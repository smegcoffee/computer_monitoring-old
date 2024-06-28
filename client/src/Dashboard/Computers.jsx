import React, { useState } from "react";
import SideBar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faClose,
  faGears,
  faQrcode,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Specs from "./Popup for Computers/Specs";
import QrCode from "./Popup for Computers/Qr";
import axios from "../api/axios";
import * as material from "@mui/material";
import { tableData } from "../data/computerData";
import CloseIcon from "@mui/icons-material/Close";
import Swal from'sweetalert2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <material.Slide direction="up" ref={ref} {...props} />;
});

function Header() {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
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
    }
  };
  return (
    <div>
      <div className="h-20 bg-blue-800 w-full flex justify-between items-center">
        <div className="flex-grow text-center">
          <p className="text-white text-4xl font-bold">
            COMPUTER MONITORING SYSTEM
          </p>
        </div>
        <Link onClick={handleLogout}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-white mr-8"
          />{" "}
        </Link>
      </div>
    </div>
  );
}

//THIS IS THE TABLE LIST OF COMPUTERS
export const TableComponent = () => {
  const [isSpecsPopupOpen, setSpecsPopupOpen] = useState(false);
  const [isQrPopupOpen, setQrPopupOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [specsData, setSpecsData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(tableData);
  // eslint-disable-next-line
  const [scroll, setScroll] = React.useState("paper");
  const [showAll, setShowAll] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [recent, setRecent] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenView = (row) => () => {
    setOpenView(true);
    setSelectedRow(row);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openEdit) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openEdit]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    if (!value.trim()) {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((item) =>
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

  const handleDescriptionChange = (newValue) => {
    setSelectedRow({ ...selectedRow, description: newValue });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.put('/api/InsertApiForView', { apps: selectedRow.description,
        recent: recent});
        if (response.data.status === true) {
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
        })
    }
  } catch (error){
    console.error('Error: ', error);
  } finally {

  }
};

  const openSpecsPopup = (data) => {
    setSpecsData(data);
    setSpecsPopupOpen(true);
  };

  const openQrPopup = (data) => {
    setQrCodeData(data);
    setQrPopupOpen(true);
  };

  const closeSpecsPopup = () => {
    setSpecsPopupOpen(false);
  };

  const closeQrPopup = () => {
    setQrPopupOpen(false);
  };

  const openSpecsData = (tableData) => {
    return {
      id: tableData.id,
      name: tableData.name,
      units: tableData.units,
    };
  };

  const generateQRCodeData = (tableData) => {
    return {
      id: tableData.id,
      data: `${tableData.id}`,
    };
  };

  const handleViewMore = () => {
    setShowAll(true);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
  return (
    <>
      {/* search thru NAME */}
      <div className="flex mb-5">
        <material.TextField
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
      <material.TableContainer
        component={material.Paper}
        className="w-full table-container"
      >
        <material.Table>
          <material.TableHead>
            <material.TableRow className="bg-blue-200">
              <material.TableCell align="center">
                <material.Typography variant="subtitle1" fontWeight="bold">
                  ID
                </material.Typography>
              </material.TableCell>
              <material.TableCell align="center">
                <material.Typography variant="subtitle1" fontWeight="bold">
                  Branch Code
                </material.Typography>
              </material.TableCell>
              <material.TableCell align="center">
                <material.Typography variant="subtitle1" fontWeight="bold">
                  Name and Position
                </material.Typography>
              </material.TableCell>
              <material.TableCell align="center">
                <material.Typography variant="subtitle1" fontWeight="bold">
                  Action
                </material.Typography>
              </material.TableCell>
            </material.TableRow>
          </material.TableHead>
          <material.TableBody>
            {filteredData
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row, index) => (
                <material.TableRow key={row.id}>
                  <material.TableCell align="center">
                    {row.id}
                  </material.TableCell>
                  <material.TableCell align="center">
                    {row.branchCode}
                  </material.TableCell>
                  <material.TableCell align="center">
                    <b>{row.name}</b>
                    <br />
                    <i>{row.position}</i>
                  </material.TableCell>
                  <material.TableCell align="center">
                    {row.action.includes("Specs") && (
                      <material.Button
                        className="hover:text-blue-500"
                        onClick={() => openSpecsPopup(openSpecsData(row))}
                      >
                        <FontAwesomeIcon icon={faGears} />
                      </material.Button>
                    )}
                    {row.action.includes("View") && (
                      <material.Button
                        className="hover:text-blue-500"
                        onClick={handleClickOpenView(row)}
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </material.Button>
                    )}
                    {row.action.includes("Qr") && (
                      <material.Button
                        className="hover:text-blue-500"
                        onClick={() => openQrPopup(generateQRCodeData(row))}
                      >
                        <FontAwesomeIcon icon={faQrcode} />
                      </material.Button>
                    )}
                  </material.TableCell>
                </material.TableRow>
              ))}
            {emptyRows > 0 && (
              <material.TableRow style={{ height: 53 * emptyRows }}>
                <material.TableCell colSpan={6} />
              </material.TableRow>
            )}
          </material.TableBody>
        </material.Table>
        <material.TablePagination
          rowsPerPageOptions={[5, 15, 20, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => handleChangePage(event, newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={
            <material.Typography variant="subtitle" fontWeight={600}>
              Entries Per Page:
            </material.Typography>
          }
        />
      </material.TableContainer>

      {/* For View Pop up dialog */}
      <material.Dialog
        open={openView}
        onClose={handleCloseView}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        maxWidth="xl"
        PaperProps={{
          style: {
            width: "70%",
            maxWidth: "none",
          },
        }}
      >
        <material.DialogTitle
          id="scroll-dialog-title"
          className="bg-blue-500 text-white"
        >
          <div className="flex">
          <material.Typography style={{marginRight: "1110px"}}>VIEW MORE</material.Typography>
          <material.Button onClick={handleCloseView}><FontAwesomeIcon icon={faClose} className="text-white"/></material.Button>
          </div>
        </material.DialogTitle>
        <material.DialogContent dividers={scroll === "paper"}>
          {selectedRow && (
            <>
              <material.Typography>
                <b>BRANCH CODE: </b>
                {selectedRow.branchCode}
              </material.Typography>
              <material.Typography>
                <b>NAME OF USER: </b>
                {selectedRow.name}
              </material.Typography>
              <material.Typography>
                <b>DESIGNATION: </b>
                {selectedRow.position}
              </material.Typography>
              <material.Typography>
                <b>COMPUTER ID: </b>
                {selectedRow.id}{" "}
              </material.Typography>
              <material.Grid container spacing={2} style={{ marginTop: "5px" }}>
                <material.Grid item xs={6}>
                  <material.TableContainer component={material.Paper}>
                    <material.Table>
                      <material.TableHead>
                        <material.TableRow className="bg-blue-300">
                          <material.TableCell>
                            <material.Typography
                              align="center"
                              variant="subtitle1"
                              fontWeight="bold"
                            >
                              UNIT CODE
                            </material.Typography>
                          </material.TableCell>
                          <material.TableCell>
                            <material.Typography
                              align="center"
                              variant="subtitle1"
                              fontWeight="bold"
                            >
                              CATEGORY
                            </material.Typography>
                          </material.TableCell>
                          <material.TableCell>
                            <material.Typography
                              align="center"
                              variant="subtitle1"
                              fontWeight="bold"
                            >
                              STATUS
                            </material.Typography>
                          </material.TableCell>
                          <material.TableCell>
                            <material.Typography
                              align="center"
                              variant="subtitle1"
                              fontWeight="bold"
                            >
                              RECENT USER
                            </material.Typography>
                          </material.TableCell>
                        </material.TableRow>
                      </material.TableHead>
                      <material.TableBody>
                        {selectedRow &&
                          selectedRow.units &&
                          selectedRow.units.map((unit, index) => (
                            <material.TableRow key={index}>
                              <material.TableCell align="center">
                                <material.Typography
                                  variant="subtitle1"
                                  fontWeight="medium"
                                >
                                  {unit.unit}
                                </material.Typography>
                              </material.TableCell>
                              <material.TableCell align="center">
                                <material.Typography
                                  variant="subtitle1"
                                  fontWeight="medium"
                                >
                                  {unit.category}
                                </material.Typography>
                              </material.TableCell>
                              <material.TableCell align="center">
                                <material.Typography
                                  variant="subtitle1"
                                  fontWeight="medium"
                                >
                                  {unit.status}
                                </material.Typography>
                              </material.TableCell>
                              <material.TableCell align="center">
                                <material.Typography
                                  variant="subtitle1"
                                  fontWeight="medium"
                                >
                                  {unit.recent}
                                </material.Typography>
                              </material.TableCell>
                            </material.TableRow>
                          ))}
                      </material.TableBody>
                    </material.Table>
                  </material.TableContainer>
                </material.Grid>
                <material.Grid item xs={6}>
                  <material.TableContainer component={material.Paper}>
                    <material.Table>
                      <material.TableHead>
                        <material.TableRow className="bg-red-300">
                          <material.TableCell>
                            <material.Typography
                              variant="subtitle1"
                              fontWeight="bold"
                            >
                              DEVICE INFORMATION
                            </material.Typography>
                          </material.TableCell>
                          <material.TableCell>
                            <material.Typography
                              variant="subtitle1"
                              fontWeight="bold"
                            >
                              DETAILS
                            </material.Typography>
                          </material.TableCell>
                        </material.TableRow>
                      </material.TableHead>
                      <material.TableBody>
                        <material.TableRow>
                          <material.TableCell>
                            <material.Typography
                              variant="subtitle1"
                              fontWeight="medium"
                            >
                              {selectedRow.category2}
                            </material.Typography>
                          </material.TableCell>
                          <material.TableCell>
                            {Array.isArray(selectedRow.description) ? (
                              <div>
                                <ul>
                                  {showAll
                                    ? selectedRow.description.map(
                                        (item, idx) => <li key={idx}>{item}</li>
                                      )
                                    : selectedRow.description
                                        .slice(0, 3)
                                        .map((item, idx) => (
                                          <li key={idx}>{item}</li>
                                        ))}
                                </ul>
                                {selectedRow.description.length > 3 &&
                                  !showAll && (
                                    <button onClick={handleViewMore}>
                                      {" "}
                                      <u>View More</u>
                                    </button>
                                  )}
                              </div>
                            ) : (
                              <span>{selectedRow.description}</span>
                            )}
                          </material.TableCell>
                        </material.TableRow>
                        <material.TableRow>
                          <material.TableCell>
                            <material.Typography
                              variant="subtitle1"
                              fontWeight="medium"
                            >
                              {selectedRow.remarks}
                            </material.Typography>
                          </material.TableCell>
                          <material.TableCell>
                            {Array.isArray(selectedRow.information) ? (
                              <div>
                                <ul>
                                  {showAll
                                    ? selectedRow.information.map(
                                        (item, idx) => <li key={idx}>{item}</li>
                                      )
                                    : selectedRow.information
                                        .slice(0, 3)
                                        .map((item, idx) => (
                                          <li key={idx}>{item}</li>
                                        ))}
                                </ul>
                                {selectedRow.information.length > 3 &&
                                  !showAll && (
                                    <button onClick={handleViewMore}>
                                      {" "}
                                      <u>View More</u>
                                    </button>
                                  )}
                              </div>
                            ) : (
                              <span>{selectedRow.information}</span>
                            )}
                          </material.TableCell>
                        </material.TableRow>
                      </material.TableBody>
                    </material.Table>
                  </material.TableContainer>
                </material.Grid>
              </material.Grid>
            </>
          )}
        </material.DialogContent>
        <material.DialogActions style={{ padding: "20px" }}>
          <material.Button
            onClick={() => handleClickOpenEdit(selectedRow)}
            variant="contained"
            style={{ backgroundColor: "green" }}
          >
            EDIT
          </material.Button>
          <material.Button onClick={handleCloseView} variant="contained">
            PRINT
          </material.Button>
        </material.DialogActions>
      </material.Dialog>

      {/* This is the pop up dialog when clicking the Edit,   I deleted the Editview file. */}
      <form onClick={handleSubmitEdit}>
      <material.Dialog
        fullScreen
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        {selectedRow !== null && (
          <>
            <material.AppBar sx={{ position: "relative" }}>
              <material.Toolbar>
                <material.IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseEdit}
                  aria-label="close"
                >
                  <CloseIcon />
                </material.IconButton>
                <material.Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  EDIT
                </material.Typography>
                <material.Button
                type="submit"
                  autoFocus
                  color="inherit"
                >
                  save
                </material.Button>
              </material.Toolbar>
            </material.AppBar>
            <material.List>
              <material.Typography
                sx={{ ml: 5, mt: 2 }}
                style={{ fontSize: "20px" }}
              >
                Computer ID: <b>{selectedRow.id}</b>
              </material.Typography>
              <material.Typography
                sx={{ ml: 5, mt: 2 }}
                style={{ fontSize: "20px" }}
              >
                Branch Code: <b>{selectedRow.branchCode}</b>
              </material.Typography>
              <material.Typography
                sx={{ ml: 5, mt: 2 }}
                style={{ fontSize: "20px" }}
              >
                Name of User: <b>{selectedRow.name}</b>
              </material.Typography>
              <material.Typography
                sx={{ ml: 5, mt: 2, mb: 2 }}
                style={{ fontSize: "20px" }}
              >
                Designation: <b>{selectedRow.position}</b>
              </material.Typography>
              <material.Divider />
              <material.Typography
                sx={{ ml: 5, mt: 2 }}
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                INSTALLED APPLICATIONS
              </material.Typography>
              <material.TextareaAutosize
                aria-multiline
                value={selectedRow.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                style={{
                  border: "1px solid #bdbdbd",
                  borderRadius: "5px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  paddingLeft: "10px",
                  width: "100%",
                  maxWidth: "700px",
                  height: "35px",
                  marginTop: "10px",
                  overflow: "hidden",
                  resize: "none",
                  marginLeft: "45px",
                  marginBottom: "10px",
                }}
              />
              <material.Divider />
              <material.Typography
                sx={{ ml: 5, mt: 2 }}
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                UNITS
              </material.Typography>
              <div className="pr-20 pl-20 mb-10">
                <material.TableContainer className="border border-gray-200 rounded-lg mt-4">
                  <material.Table>
                    <material.TableHead className="bg-red-200">
                      <material.TableRow>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            UNIT CODE
                          </material.Typography>
                        </material.TableCell>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            CATEGORY
                          </material.Typography>
                        </material.TableCell>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            DESCRIPTION
                          </material.Typography>
                        </material.TableCell>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            SUPPLIER
                          </material.Typography>
                        </material.TableCell>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            DATE OF PURCHASE
                          </material.Typography>
                        </material.TableCell>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            SERIAL NUMBER
                          </material.Typography>
                        </material.TableCell>
                        <material.TableCell align="center">
                          <material.Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            RECENT USER
                          </material.Typography>
                        </material.TableCell>
                      </material.TableRow>
                    </material.TableHead>
                    <material.TableBody>
                      {selectedRow &&
                        selectedRow.units &&
                        selectedRow.units.map((unit, index) => (
                          <material.TableRow key={index}>
                            <material.TableCell align="center">
                              {unit.unit}
                            </material.TableCell>
                            <material.TableCell align="center">
                              {unit.category}
                            </material.TableCell>
                            <material.TableCell align="center">
                              {unit.description2}
                            </material.TableCell>
                            <material.TableCell align="center">
                              {unit.supplier}
                            </material.TableCell>
                            <material.TableCell align="center">
                              {unit.dop}
                            </material.TableCell>
                            <material.TableCell align="center">
                              {unit.serial}
                            </material.TableCell>
                            <material.TableCell align="center">
                              <material.TextField
                                placeholder={unit.recent}
                                value={recent[index] || ""}
                                onChange={(e) => {
                                  const newRecent = [...recent];
                                  newRecent[index] = e.target.value;
                                  setRecent(newRecent);
                                }}
                              />
                            </material.TableCell>
                          </material.TableRow>
                        ))}
                    </material.TableBody>
                  </material.Table>
                </material.TableContainer>
              </div>
              <material.Divider />
              <material.Typography
                sx={{ ml: 5, mt: 2 }}
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                REMARKS
              </material.Typography>
              <material.List sx={{ ml: 5 }}>
                {selectedRow &&
                  selectedRow.information &&
                  selectedRow.information.map((info, index) => (
                    <React.Fragment key={index}>
                      <material.ListItem>
                        {info.split("-").join("-\n")}
                      </material.ListItem>
                      {index !== selectedRow.information.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </material.List>
            </material.List>
          </>
        )}
      </material.Dialog>
      </form>
      <Specs
        isOpen={isSpecsPopupOpen}
        onClose={closeSpecsPopup}
        specsData={specsData}
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
          <p className="font-normal text-2xl pt-10 ml-10">Managed Computers</p>
          <p className="font-light text-lg ml-10">
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
