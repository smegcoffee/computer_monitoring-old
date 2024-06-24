import React, { useState, useEffect }from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Autocomplete, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { userData } from '../../data/userAddData';
import Swal from 'sweetalert2';
import axios from '../../api/axios';

function EditSet({ isOpen, onClose, row, editPopupData }) {
    const units = editPopupData.units;
    const [user, setUser] = useState('');
    const [rows, setRows] = useState([]);
    
      useEffect(() => {
        if (Array.isArray(units)) {
          setRows(units);
        } else {
          console.error('Units is not an array');
        }
      }, [units]);
  
      // Function to delete a row
       const handleDelete = (index) => {
        if (!Array.isArray(rows)) {
          console.error('Rows is not an array');
          return;
        }
    
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
      };

  if (!isOpen) {
    return null;
  }
  
  const handleSubmitEditedSet = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.put('api/insertApiForComputerSet', {
        units: units,
        user: user
      });
      if (response.data.status === true){
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
          }).then(function(){
          window.location = "/set";
        });
      }
      console.log('Updating computer set:', response.data);
    }catch(error) {
      console.log('Error in adding user:', error);
      if(error.response && error.response.data){
        console.log('Backend error response:', error.response.data);
      } else{
        console.log('ERROR!');
      }
    }finally{

    }
  }

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div className="bg-white rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-md" style={{minWidth: '1000px', maxWidth:'100vh', maxHeight:'100vh'}}>
        <div className='text-justify'>
          <form onSubmit={handleSubmitEditedSet}>
      <TableContainer component={Paper} style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
            <Table>
                <TableHead>
                    <TableRow className='bg-red-200'>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>UNIT CODE</Typography></TableCell>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>DATE OF PURCHASE</Typography></TableCell>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>CATEGORY</Typography></TableCell>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>DESCRIPTION</Typography></TableCell>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>SUPPLIER</Typography></TableCell>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>SERIAL NO.</Typography></TableCell>
                        <TableCell align='center'><Typography variant='subtitle1' fontWeight='bold'>STATUS</Typography></TableCell>
                        <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((unit, index) => (
                        <TableRow key={index}>
                            <TableCell align='center'>{unit.unit}</TableCell>
                            <TableCell align='center'>{unit.dop}</TableCell>
                            <TableCell align='center'>{unit.category}</TableCell>
                            <TableCell align='center'>{unit.description2}</TableCell>
                            <TableCell align='center'>{unit.supplier}</TableCell>
                            <TableCell align='center'>{unit.serial}</TableCell>
                            <TableCell align='center'>{unit.status}</TableCell>
                            <TableCell align='center'>
                                <button onClick={handleDelete} className="text-red-600 text-base font-semibold">
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </TableCell>
                            </TableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div className='flex justify-center items-center'>
        <div className='flex-none'>
        <Autocomplete
            freeSolo
            id='user'
            disableClearable
            options={userData.map((option) => option.name)}
            renderInput={(params) => (
                <TextField
                    value={user}
                    placeholder={editPopupData.name}
                    onChange={(event) => {
                      setUser(event.target.value);
                    }}
                    {...params}
                    label='Assign New User?'
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                    variant='outlined'
                    style={{
                        marginLeft: "20px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        marginRight: "400px",
                        width: "300px",
                    }}
                />
            )}
        />
        </div>
        <div className='flex-1 justify-center items-center text-center'>
            <button className='bg-gray-200 h-8 w-24 rounded-full font-semibold text-sm' onClick={onClose}>CANCEL</button>
            <button type='submit' className='bg-green-600 h-8 w-24 text-white rounded-full ml-3 text-sm font-semibold'>SAVE</button>
        </div>
        </div>
        </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditSet;