import React, { useState, useRef, useEffect }from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


function EditUser({units}) {
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

  
    return (
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
                                <button onClick={() => handleDelete(index)} className="text-red-600 text-base font-semibold"><FontAwesomeIcon icon={faMinus} /></button>
                            </TableCell>
                            </TableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
  }

const SearchableDropdown = ({ options, placeholder, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isOpen]);
  
    const handleInputChange = (event) => {
      const searchTerm = event.target.value;
      setSearchTerm(searchTerm);
  
      const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filteredOptions);
      setIsOpen(true);
    };
  
    const handleSelectOption = (option) => {
      setSearchTerm(option);
      onSelect(option);
      setIsOpen(false);
    };
  
    return (
      <div ref={dropdownRef}>
        <input
          type="text"
          className='ml-3 mb-3 bg-gray-100 rounded-md p-1'
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-20 max-w-max bg-white border border-gray-300 rounded-md mt-1 ml-4">
            {filteredOptions.map(option => (
              <li
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

function EditSet({ isOpen, onClose, row, editPopupData }) {
    const [inputValue, setInputValue] = useState('');

  if (!isOpen) {
    return null;
  }


  const handleChange = (index, event) => {
    if (event && event.target) {
      const newInputValue = [...inputValue];
      newInputValue[index] = event.target.value;
      setInputValue(newInputValue);
    } else {
      console.error('Event object or target property is undefined');
    }
  };
  

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div className="bg-white rounded-tl-xl rounded-tr-xl shadow-md" style={{minWidth: '1000px', maxWidth:'100vh', maxHeight:'100vh'}}>
        <div className='text-justify'>
        {editPopupData && <EditUser units={editPopupData.units} />}
        <div className='flex justify-center items-center'>
        <div className='flex-none'>
        <p className='ml-4 mt-3 mb-1 font-semibold'>Assign User:</p>
        <input type='text' className='ml-3 mb-3 bg-gray-100 rounded-md p-1' placeholder="Enter name..."/>
        </div>
        <div className='flex-none'>
        <p className='ml-4 mt-3 mb-1 font-semibold'>Position:</p>
        <input type='text' className='ml-3 mb-3 bg-gray-100 rounded-md p-1' placeholder="Enter position..."/>
        </div>
        <div className='flex-none'>
        <p className='ml-4 mt-3 mb-1 font-semibold'>Branch Code:</p>
        <SearchableDropdown
        options={["BOHL", "DSMT", "DSMT2", "DSMAO", "DSMBN", "HO"]}
        placeholder="Select Branch Code"
        onSelect={(option) => {
            const event = { target: { value: option } };
            handleChange(0, event);
        }}
        />
        </div>
        <div className='flex-1 justify-center items-center text-center'>
            <button className='bg-gray-200 h-8 w-24 rounded-full font-semibold text-sm' onClick={onClose}>CANCEL</button>
            <button className='bg-green-600 h-8 w-24 text-white rounded-full ml-3 text-sm font-semibold'>SAVE</button>
        </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditSet;