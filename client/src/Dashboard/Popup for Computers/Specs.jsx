import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import smct from './../../img/smct.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function TableSpecs() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>CATEGORY</Typography></TableCell>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>DESCRIPTION</Typography></TableCell>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>SUPPLIER</Typography></TableCell>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>DATE OF PURCHASE</Typography></TableCell>
            <TableCell><Typography variant='subtitle1' fontWeight='bold'>SERIAL NUMBER</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Sample data */}
          <TableRow>
            <TableCell>Data 1</TableCell>
            <TableCell>Data 2</TableCell>
            <TableCell>Data 3</TableCell>
            <TableCell>Data 4</TableCell>
            <TableCell>Data 9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data 5</TableCell>
            <TableCell>Data 6</TableCell>
            <TableCell>Data 7</TableCell>
            <TableCell>Data 8</TableCell>
            <TableCell>Data 10</TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Specs({ isOpen, onClose }) {
  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }

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
            <div className='flex-2 ml-28 text-white text-3xl mt-7 font-medium'>
                Computer ID: 00001
            </div>
        </div>
        <div className='text-justify mt-6 ml-6 mr-6 mb-4'>
        <h2 className="text-xl font-semibold mb-4">Specifications:</h2>
        <TableSpecs/>
        </div>
      </div>
    </div>
  );
}

export default Specs;
