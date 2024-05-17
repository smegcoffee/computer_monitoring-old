import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import smct from './../../img/smct.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EditView from './Editview';

function TableView() {
    // Sample data
    const data = [
      { category: 'Status', description: 'Working' },
      { category: 'Recent Previous User', description: 'Zoro Kun' },
      { category: 'Installed Applications', description: 'Microsoft Office' },
      { category: 'Date of Purchase', description: 'January 11, 2001' },
      { category: 'Remarks', description: 'Lorem Epsom Dolor' },
      // Add more data objects as needed
    ];
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='subtitle1' fontWeight='bold'>DEVICE INFORMATION</Typography></TableCell>
              <TableCell><Typography variant='subtitle1' fontWeight='bold'>DETAILS</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell><Typography variant='subtitle1' fontWeight='medium'>{row.category}</Typography></TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


function View({ isOpen, onClose }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-md" style={{width:'1000px', maxHeight:'100vh'}}>
        <span className="absolute top-5 right-5 p-2 cursor-pointer text-white" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} className='w-6 h-6'/>
        </span>
        <div className='bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max p-5 flex'>
            <div className='flex-none'>
            <img src={smct} alt="SMCT Logo" className='w-60 h-24 m-0 block'></img>
            </div>
            <div className='flex-none text-white text-justify text-lg mt-4 ml-10'>
                <p><b>BRANCH CODE: </b>BOHL</p>
                <p><b>NAME OF USER: </b>Nami Swan</p>
                <p><b>DESIGNATION: </b>IT Staff</p>
            </div>
            <div className='flex-1 text-white text-3xl mt-7 font-medium'>
                Computer ID: 00001
            </div>
        </div>
        <div className='text-justify mt-6 ml-6 mr-6 mb-4'>
        <TableView/>
        </div>
        <div className='flex justify-center items-center text-center pt-10 pb-10'>
            <button className='bg-gray-300 text-black rounded-3xl h-9 w-36 text-xl hover:bg-gray-700 hover:text-white mr-16' onClick={handleEditClick}>EDIT</button>
            <button className='bg-blue-500 text-white rounded-3xl h-9 w-36 text-xl hover:bg-blue-300 hover:text-black'>PRINT</button>
        </div>
        {isEditOpen && <EditView isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />}
      </div>
    </div>
  );
}

export default View;
