import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import smct from './../../img/smct.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Specs({ isOpen, onClose, specsData }) {
  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-md" style={{maxWidth:'100vh', maxHeight:'100vh'}}>
        <span className="absolute top-5 right-5 p-2 cursor-pointer text-white" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} className='w-6 h-6'/>
        </span>
        <div className='bg-blue-500 rounded-tr-2xl rounded-tl-2xl max-h-max p-5 flex'>
            <div className='flex-none'>
            <img src={smct} alt="SMCT Logo" className='w-60 h-24 m-0 block'></img>
            </div>
            <div className='flex-2 ml-28 text-white text-3xl mt-7 font-medium'>
                Computer ID: {specsData.id}

            </div>
        </div>
        <div className='text-justify mt-6 ml-6 mr-6 mb-4'>
        <h2 className="text-xl font-semibold mb-4">Specifications:</h2>
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell align= "center"><Typography variant='subtitle1' fontWeight='bold'>UNIT CODE</Typography></TableCell>
            <TableCell align= "center"><Typography variant='subtitle1' fontWeight='bold'>CATEGORY</Typography></TableCell>
            <TableCell align= "center"><Typography variant='subtitle1' fontWeight='bold'>DESCRIPTION</Typography></TableCell>
            <TableCell align= "center"><Typography variant='subtitle1' fontWeight='bold'>SUPPLIER</Typography></TableCell>
            <TableCell align= "center"><Typography variant='subtitle1' fontWeight='bold'>DATE OF PURCHASE</Typography></TableCell>
            <TableCell align= "center"><Typography variant='subtitle1' fontWeight='bold'>SERIAL NUMBER</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specsData.units.map((unit, index)=> (
          <TableRow key={index}>
          <TableCell align= "center">{unit.unit}</TableCell>
            <TableCell align= "center">{unit.category}</TableCell>
            <TableCell align= "center">{unit.description2}</TableCell>
            <TableCell align= "center">{unit.supplier}</TableCell>
            <TableCell align= "center">{unit.dop}</TableCell>
            <TableCell align= "center">{unit.serial}</TableCell>
          </TableRow>
          ))}
      </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Specs;
