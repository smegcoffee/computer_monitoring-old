import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import smct from './../../img/smct.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import EditView from './Editview';


function View({ isOpen, onClose, viewData}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const handleViewMore = () =>{
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
      <div className="bg-white rounded-2xl shadow-md" style={{maxWidth:'100vh', minWidth: "1000px", maxHeight:'100vh'}}>
        <span className="absolute top-5 right-5 p-2 cursor-pointer text-white" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} className='w-6 h-6'/>
        </span>
        <div className='bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max p-5 flex'>
            <div className='flex-none'>
            <img src={smct} alt="SMCT Logo" className='w-60 h-24 m-0 block'></img>
            </div>
            <div className='flex-none text-white text-justify text-lg mt-4 ml-10'>
                <p><b>BRANCH CODE: </b>{viewData.branchCode}</p>
                <p><b>NAME OF USER: </b>{viewData.name}</p>
                <p><b>DESIGNATION: </b>{viewData.position}</p>
            </div>
            <div className='flex-1 text-white text-3xl mt-7 font-medium text-center'>
                Computer ID: {viewData.id}
            </div>
        </div>
        <div className='text-justify mt-6 ml-6 mr-6 mb-4'>
        <Grid container spacing={2}>
  <Grid item xs={6}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className='bg-blue-300'>
            <TableCell><Typography align='center' variant='subtitle1' fontWeight='bold'>UNIT CODE</Typography></TableCell>
            <TableCell><Typography align='center' variant='subtitle1' fontWeight='bold'>CATEGORY</Typography></TableCell>
            <TableCell><Typography align='center' variant='subtitle1' fontWeight='bold'>STATUS</Typography></TableCell>
            <TableCell><Typography align='center' variant='subtitle1' fontWeight='bold'>RECENT USER</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align='center'><Typography variant='subtitle1' fontWeight='medium'>{viewData.unit}</Typography></TableCell>
              <TableCell align='center'><Typography variant='subtitle1' fontWeight='medium'>{viewData.category}</Typography></TableCell>
              <TableCell align='center'><Typography variant='subtitle1' fontWeight='medium'>{viewData.status}</Typography></TableCell>
              <TableCell align='center'><Typography variant='subtitle1' fontWeight='medium'>{viewData.recent}</Typography></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
  <Grid item xs={6}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className='bg-red-300'>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>DEVICE INFORMATION</Typography></TableCell>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>DETAILS</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell><Typography variant='subtitle1' fontWeight='medium'>{viewData.category2}</Typography></TableCell>
              <TableCell>
                {Array.isArray(viewData.description) ? (
                  <div>
                  <ul>
                    {showAll
                    ? viewData.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                    ))
                    : viewData.description.slice(0, 3).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  {viewData.description.length > 3 && !showAll && (
                    <button onClick={handleViewMore}> <u>View More</u></button>
                  )}
                  </div>
                ) : (
                  <span>{viewData.description}</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant='subtitle1' fontWeight='medium'>{viewData.remarks}</Typography></TableCell>
              <TableCell>
                {Array.isArray(viewData.information) ? (
                  <div>
                  <ul>
                    {showAll
                    ? viewData.information.map((item, idx) => (
                    <li key={idx}>{item}</li>
                    ))
                    : viewData.information.slice(0, 3).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  {viewData.information.length > 3 && !showAll && (
                    <button onClick={handleViewMore}> <u>View More</u></button>
                  )}
                  </div>
                ) : (
                  <span>{viewData.information}</span>
                )}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
</Grid>
        </div>
        <div className='flex justify-center items-center text-center pt-10 pb-10'>
            <button className='bg-gray-300 text-black rounded-3xl h-9 w-36 text-xl mr-16' onClick={handleEditClick}>EDIT</button>
            <button className='bg-blue-500 text-white rounded-3xl h-9 w-36 text-xl'>PRINT</button>
        </div>
        {isEditOpen && <EditView isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} viewData={viewData}/>}
      </div>
    </div>
  );
}

export default View;
