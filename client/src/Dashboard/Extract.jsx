import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Container,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { tableData } from "../data/computerData";
import "react-datepicker/dist/react-datepicker.css";
//import axios from 'axios';

const Extract = () => {
  const { id } = useParams();
  //const [computer, setComputer] = useState(null);
  const [remark, setRemark] = useState("");
  const [remarks, setRemarks] = useState("");
  const [application, setApplication] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [otherApplication, setOtherApplication] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Sample computer data
  const computer = tableData.find((computer) => computer.id === parseInt(id));

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "Others") {
      setApplication("");
    } else {
      setOtherApplication("");
    }
    setApplication(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", {
      id,
      remark,
      remarks,
      selectedDate,
      application,
      otherApplication,
    });
  };

  /* useEffect(() => {
    const fetchComputerData = async () => {
      try {
        const response = await fetch(`/api/computers/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComputer(data);
        console.log('Fetched data:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchComputerData();
  }, [id]);

  if (!computer) {
    return <div>Loading...</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/computers/update', {
      id,
      remark,
      remarks,
      selectedDate,
      application,
      ...(application === 'Others' && {otherApplication}),
      }, {
      headers: {
      'Content-Type': 'application/json',
      },
      });
      if (response.ok) {
        console.log('Added.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
    */
  return (
    <Container>
      <Card className="mt-20 mb-20">
        <CardContent>
          <Typography variant="h5">Computer Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                ID: <b>{computer.id}</b>
              </Typography>
              <Typography variant="body1">
                Name: <b>{computer.name}</b>
              </Typography>
              <Typography variant="body1">
                Position: <b>{computer.position}</b>
              </Typography>
              <Typography variant="body1">
                Branch Code: <b>{computer.branchCode}</b>
              </Typography>
              <TableContainer className="border border-gray-200 rounded-lg mt-4">
                <Table>
                  <TableHead className="bg-blue-200">
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          UNIT CODE
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
                          DATE OF PURCHASE
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          SERIAL NUMBER
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {computer.units.map((unit, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{unit.unit}</TableCell>
                        <TableCell align="center">{unit.category}</TableCell>
                        <TableCell align="center">
                          {unit.description2}
                        </TableCell>
                        <TableCell align="center">{unit.supplier}</TableCell>
                        <TableCell align="center">{unit.dop}</TableCell>
                        <TableCell align="center">{unit.serial}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="center"
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h5" align="center">
                  Installed Applications
                </Typography>
                <div style={{ marginLeft: "165px" }}>
                  <List>
                    {computer.description
                      .slice(0, showAll ? computer.description.length : 5)
                      .map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                  </List>
                  {computer.description.length > 5 && (
                    <Button onClick={toggleShowAll}>
                      {showAll ? "Show less" : "Show more"}
                    </Button>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" align="center">
                  Remarks
                </Typography>
                <div style={{ marginLeft: "185px" }}>
                  <List>
                    {computer.information
                      .slice(0, showAll ? computer.information.length : 5)
                      .map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                  </List>
                  {computer.information.length > 5 && (
                    <Button onClick={toggleShowAll}>
                      {showAll ? "Show less" : "Show more"}
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Select Installed Application"
                  value={application}
                  onChange={handleChange}
                  select
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Adobe Photoshop">Adobe Photoshop</MenuItem>
                  <MenuItem value="Microsoft Office">Microsoft Office</MenuItem>
                  <MenuItem value="Github Desktop">Github Desktop</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
                {application === "Others" && (
                  <TextField
                    label="Other Application"
                    value={otherApplication}
                    onChange={(e) => setOtherApplication(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                )}
                <TextField
                  label="Is it Formatted?"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  select
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="">No</MenuItem>
                  <MenuItem value="Formatted">Formatted</MenuItem>
                </TextField>
                <TextareaAutosize
                  aria-multiline
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter Remarks..."
                  style={{
                    border: "1px solid #bdbdbd",
                    borderRadius: "5px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width: "100%",
                    maxWidth: "1120px",
                    height: "35px",
                    marginTop: "10px",
                    overflow: "hidden",
                    resize: "none",
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField"]}>
                    <DateField
                      fullWidth
                      label="Date"
                      value={selectedDate}
                      onChange={(newDate) => setSelectedDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>{" "}
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Extract;
