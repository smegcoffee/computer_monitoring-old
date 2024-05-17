import React, {useState} from 'react';
import smct from './../../img/smct.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function TableView() {
  //sample data
  const [rows, setRows] = useState([
    { category: 'Status', description: 'Working' },
    { category: 'Recent Previous User', description: 'Zoro Kun' },
    { category: 'Installed Applications', description: 'Microsoft Office' },
    { category: 'Date of Purchase', description: 'January 11, 2001' },
    { category: 'Remarks', description: 'Lorem Epsom Dolor' },
    // Add more data objects as needed
  ]);

  const handleDescriptionChange = (event, index) => {
    const newRows = [...rows];
    newRows[index].description = event.target.value;
    setRows(newRows);
  };
    
  
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell><Typography variant='subtitle1' fontWeight='medium'>{row.category}</Typography></TableCell>
                <TableCell>
                <input 
                    type="text" 
                    value={row.description} 
                    onChange={(event) => handleDescriptionChange(event, index)}
                />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function EditView({ isOpen, onClose }) {
  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-md" style={{width:'1000px', maxHeight:'100vh'}}>
        <div className='bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max p-5 flex'>
            <div className='flex-none'>
            <img src={smct} alt="SMCT Logo" className='w-60 h-24 m-0 block'></img>
            </div>
            <div className='flex-none text-justify mt-4 ml-10'>
                <p><b className='text-white text-lg'>BRANCH CODE: </b><input type="text" defaultValue="BOHL" className='text-black h-5 text-sm pl-2 pt-1 rounded-lg'/></p>
                <p><b className='text-white text-lg'>NAME OF USER: </b><input type="text" defaultValue="Nami Swan" className='text-black h-5 text-sm pl-2 pt-1 rounded-lg'/></p>
                <p><b className='text-white text-lg'>DESIGNATION: </b><input type="text" defaultValue="IT Staff" className='text-black h-5 text-sm pl-2 pt-1 rounded-lg'/></p>
            </div>
            <div className='flex-1 text-white text-3xl mt-7 font-medium'>
                Computer ID: 00001
            </div>
        </div>
        <div className='text-justify mt-6 ml-6 mr-6 mb-4'>
        <TableView/>
        </div>
        <div className='flex justify-center items-center text-center pt-10 pb-10'>
            <button className='bg-gray-300 text-black rounded-3xl h-9 w-36 text-xl hover:bg-gray-700 hover:text-white mr-16' onClick={onClose}>CANCEL</button>
            <button className='bg-green-500 text-white rounded-3xl h-9 w-36 text-xl hover:bg-green-300 hover:text-black'>SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default EditView;
