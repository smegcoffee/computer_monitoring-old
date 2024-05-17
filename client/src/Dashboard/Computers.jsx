import React, { useState, useEffect, useRef }from 'react';
import SideBar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faArrowUpRightFromSquare, faGears, faQrcode, faRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Specs from './Popup for Computers/Specs';
import View from './Popup for Computers/View';
import QrCode from './Popup for Computers/Qr';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
  } from '@mui/material';

function Header(){
    return(
        <div>
            <div className='h-20 bg-blue-800 w-full flex justify-between items-center'>
                <div className='flex-grow text-center'>
                    <p className='text-white text-4xl font-bold'>COMPUTER MONITORING SYSTEM</p>
                </div>
                <Link to="/login"><FontAwesomeIcon icon={faRightFromBracket} className='text-white mr-8' /> </Link>
            </div>
        </div>
    );
}

//THIS IS FOR THE TYPABLE AND SEARCHABLE DROPDOWN

const SearchableDropdown = ({ options, placeholder, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false); // Close dropdown if click occurs outside of it
        }
      };
  
      // Attach event listener when dropdown is open
      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      } else {
        // Remove event listener when dropdown is closed
        document.removeEventListener('click', handleClickOutside);
      }
  
      // Cleanup function to remove event listener on unmount
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
      <div ref={dropdownRef} className="flex items-center mb-4 relative">
        <input
          type="text"
          className="w-44 h-8 border border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 pl-2 ml-4 mt-2"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 top-full">
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
  };

//END OF THE SEARCHABLE DROPDOWN FOR BRANCH CODE

//THIS IS THE TABLE LIST OF COMPUTERS
const TableComponent = () => {
  const [isSpecsPopupOpen, setSpecsPopupOpen] = useState(false);
  const [isViewPopupOpen, setViewPopupOpen] = useState(false);
  const [isQrPopupOpen, setQrPopupOpen] = useState(false);

  const openSpecsPopup = () => {
    setSpecsPopupOpen(true);
  };

  const openViewPopup = () => {
    setViewPopupOpen(true);
  };

  const openQrPopup = () => {
    setQrPopupOpen(true);
  };

  const closeSpecsPopup = () => {
    setSpecsPopupOpen(false);
  };

  const closeViewPopup = () => {
    setViewPopupOpen(false);
  };

  const closeQrPopup = () => {
    setQrPopupOpen(false);
  };

  // Example data
  const [tableData] = useState([
    { id: 1, branchCode: 'ABC', name: 'John Doe', action: 'SpecsViewQr' },
    { id: 2, branchCode: 'DEF', name: 'Jane Smith', action: 'SpecsViewQr' },
    // Add more data as needed
  ]);

  return (
    <TableContainer component={Paper} className='w-full'>
      <Table>
        <TableHead>
          <TableRow className='bg-blue-200'>
            <TableCell align='center'><Typography variant="subtitle1" fontWeight="bold">ID</Typography></TableCell>
            <TableCell align='center'><Typography variant='subtitle1' fontWeight="bold">Branch Code</Typography></TableCell>
            <TableCell align='center'><Typography variant='subtitle1' fontWeight="bold">Name and Position</Typography></TableCell>
            <TableCell align='center'><Typography variant='subtitle1' fontWeight="bold">Action</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(row => (
            <TableRow key={row.id}>
              <TableCell align='center'>{row.id}</TableCell>
              <TableCell align='center'>{row.branchCode}</TableCell>
              <TableCell align='center'>{row.name}</TableCell>
              <TableCell align='center'>
                {/* You can render different actions based on the category */}
                {row.action.includes('Specs') && (
                  <Button className='hover:text-blue-500' onClick={openSpecsPopup}>
                    <FontAwesomeIcon icon={faGears} />
                  </Button>
                )}
                {row.action.includes('View') && (
                  <Button className='hover:text-blue-500' onClick={openViewPopup}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Button>
                )}
                {row.action.includes('Qr') && (
                  <Button className='hover:text-blue-500' onClick={openQrPopup}>
                    <FontAwesomeIcon icon={faQrcode} />
                  </Button>
                )}
                <Specs isOpen={isSpecsPopupOpen} onClose={() => closeSpecsPopup('specs')} />
                <View isOpen={isViewPopupOpen} onClose={() => closeViewPopup('view')} />
                <QrCode isOpen={isQrPopupOpen} onClose={() => closeQrPopup('qr')} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
//END OF LIST OF COMPUTERS

//THIS IS FOR THE DROPDOWN FOR ENTRIES PER PAGE

function DropdownEntries({ onSelect }) {
    const [selectedValue, setSelectedValue] = useState(10);
  
    const handleChange = (e) => {
      const newValue = parseInt(e.target.value);
      setSelectedValue(newValue);
      onSelect(newValue);
    };
  
    return (
      <select value={selectedValue} onChange={handleChange}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    );
  }
// END OF THE DROPDOWN FOR ENTRIES

function Computers() {
    const [inputValues, setInputValues] = useState(['']);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const handleChange = (index, event) => {
        const newValue = event.target.value;
        const newInputValues = [...inputValues]; 
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
      };
      

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Managed Computers</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Computers</p>
                    <br/> <br/>
                    <div className='w-full h-full ml-10'>
                    <div className='w-full h-2/6 border-gray-300 shadow-2xl rounded-xl'>
                        <div className='pl-16 pt-5'>
                        {/* search thru branch code */}
                                <p className='text-lg font-normal pt-4 pl-4'>Branch Code</p>
                                <div className='flex'>
                                <SearchableDropdown
                                    options={["BOHL", "DSMT", "DSMT2", "DSMAO", "DSMBN"]}
                                    placeholder="Select Branch Code..."
                                    onSelect={(option) => {
                                    const event = { target: { value: option } };
                                    handleChange(4, event);
                                    }}
                                />
                                <FontAwesomeIcon icon={faSearch} className=' mb-7 mt-5 ml-4 h-4 w-4 p-2 bg-blue-200 hover:bg-blue-600 hover:text-white rounded-xl text-center'/>
                                <FontAwesomeIcon icon={faArrowRotateRight} className='mb-7 mt-5 ml-4 h-4 w-4 p-2 bg-red-200 hover:bg-red-600 hover:text-white rounded-xl text-center'/>
                                </div>
                    </div>
                    </div>
                    <div className='w-full max-h-full border-gray-300 shadow-2xl rounded-xl mt-10'>
                        <div className='pt-4 pl-6 pb-4 flex font-light'>
                            <DropdownEntries onSelect={setEntriesPerPage}/>
                        <p className='ml-2'>entries per page</p>
                        </div>
                        <div>
                       <TableComponent/>
                        {/* list of computers */}
                        </div>
                        <div className='pt-4 pl-6 pb-4 font-light'>
                            <p>Showing 1 to {entriesPerPage} of <b>{entriesPerPage} entries</b></p>
                        </div>
                    </div>
                    </div>
                </div>
                <div style={{ flex: 'none', height: '100px'}}>
                    <p className='font-normal text-xl pt-10 pr-10'>Welcome, <Link to="/profile"><b>Angeleen Darunday</b></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Computers;