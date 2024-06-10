import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Grid, Container, CardContent, Button, TextField, MenuItem, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { tableData } from './Computers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Extract = () => {
  const { id } = useParams();
  //const [computer, setComputer] = useState(null);
  const [remark, setRemark] = useState('');
  const [application, setApplication] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [otherApplication, setOtherApplication] = useState('');


  // Sample computer data
  const computer = tableData.find(computer => computer.id === parseInt(id));
  console.log(computer);

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  }

  const handleChange = (e) => {
    const {value} = e.target;
    if (value === 'Others') {
      setApplication('');
    } else{
      setOtherApplication('');
    }
    setApplication(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', { id, remark, selectedDate, application, otherApplication });
  }
// eslint-disable-next-line
  {/* useEffect(() => {
    const fetchComputerData = async () => {
      try {
        const response = await fetch(`/api/computers/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComputer(data);
        console.log('Fetched data:', data); // Log fetched data
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
      const response = await fetch('/api/computers/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: computer.id,
          remark,
          application,
        }),
      });
      if (response.ok) {
        console.log('Added.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
    */}

  return (
    <Container>
      <Card className='mt-20'>
        <CardContent>
          <Typography variant="h5">Computer Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">ID: <b>{computer.id}</b></Typography>
              <Typography variant="body1">Name: <b>{computer.name}</b></Typography>
              <Typography variant="body1">Position: <b>{computer.position}</b></Typography>
              <Typography variant="body1">Branch Code: <b>{computer.branchCode}</b></Typography>
              <TableContainer className='border border-gray-200 rounded-lg mt-4'>
                <Table>
                  <TableHead className='bg-blue-200'>
                    <TableRow>
                    <TableCell align='center'><Typography variant="body1"><b>Unit</b></Typography></TableCell>
                    <TableCell align='center'><Typography variant="body1"><b>Category</b></Typography></TableCell>
                    <TableCell align='center'><Typography variant="body1"><b>Status</b></Typography></TableCell>
                    <TableCell align='center'><Typography variant="body1"><b>Recent</b></Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell align='center'><Typography variant="body1">{computer.unit}</Typography></TableCell>
                    <TableCell align='center'><Typography variant="body1">{computer.category}</Typography></TableCell>
                    <TableCell align='center'><Typography variant="body1">{computer.status}</Typography></TableCell>
                    <TableCell align='center'><Typography variant="body1">{computer.recent}</Typography></TableCell>
                  </TableRow>
              </TableBody>
              </Table>
              </TableContainer>
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
                  <MenuItem value="Adobe Photoshop">Adobe Photoshop</MenuItem>
                  <MenuItem value="Microsoft Office">Microsoft Office</MenuItem>
                  <MenuItem value="Github Desktop">Github Desktop</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
                {application === 'Others' && (
                  <TextField
                    label="Other Application"
                    value={otherApplication}
                    onChange={(e) => setOtherApplication(e.target.value)}
                    fullWidth
                    margin='normal'
                  />
                )}
                <TextField
                  label="Enter remarks..."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  select
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Formatted">Formatted</MenuItem>
                  <MenuItem value="Defective">Defective</MenuItem>
                </TextField>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleChangeDate}
                  placeholderText='Select Date...'
                  className='pl-2 border border-gray-400 rounded-sm mb-5'
                /> <br/>
                <Button type="submit" variant="contained" color="primary">Add</Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Extract;