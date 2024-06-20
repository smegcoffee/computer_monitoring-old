import React, { useState, useEffect, useRef }from 'react';
import SideBar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faGears, faQrcode, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Specs from './Popup for Computers/Specs';
import View from './Popup for Computers/View';
import QrCode from './Popup for Computers/Qr';
import axios from '../api/axios';
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
    TablePagination,
  } from '@mui/material';

function Header(){
  const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            return;
        }

        await axios.get('/api/logout', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.removeItem('token');
        window.location = "/login";
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
    return(
        <div>
            <div className='h-20 bg-blue-800 w-full flex justify-between items-center'>
                <div className='flex-grow text-center'>
                    <p className='text-white text-4xl font-bold'>COMPUTER MONITORING SYSTEM</p>
                </div>
                <Link onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className='text-white mr-8' /> </Link>
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
  
      // Attaching event listener when dropdown is open
      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      } else {
        // Removing event listener when dropdown is closed
        document.removeEventListener('click', handleClickOutside);
      }
  
      // Cleaning up function to remove event listener on unmount
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
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 ml-2 top-full">
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
export const TableComponent = () => {
  const [isSpecsPopupOpen, setSpecsPopupOpen] = useState(false);
  const [isViewPopupOpen, setViewPopupOpen] = useState(false);
  const [isQrPopupOpen, setQrPopupOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [specsData, setSpecsData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openSpecsPopup = (data) => {
    setSpecsData(data);
    setSpecsPopupOpen(true);
  };

  const openViewPopup = (data) => {
    setViewData(data);
    setViewPopupOpen(true);
  };

  const openQrPopup = (data) => {
    setQrCodeData(data);
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

  // Example data of the Table/List of Computers this will be rendered to Specs, View, and Qr
 /* const [tableData] = useState([
    { id: 1, branchCode: 'BOHL', name: 'John Doe', position: 'Front End Developer', action: 'SpecsViewQr', unit: 123, category: "Monitor", status: "Working", recent: "Zoro Kun",
    category2: 'Installed Applications', description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
    remarks: 'Remarks', information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'], description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024",
    serial: "123456"
    },
    { id: 2, branchCode: 'DSMT', name: 'Jane Smith', position: 'Software Engineer', action: 'SpecsViewQr', unit: 245, category: "Keyboard", status: "New", recent: "Nami Swan", 
    category2: 'Installed Applications', description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
    remarks: 'Remarks', information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'], description2: "Predator Keyboard w/ Backlight", supplier: "Computer Republic", dop: "04/05/2024",
    serial: "123456"
    },
    { id: 3, branchCode: 'HO', name: 'Angeleen Darunday', position: 'Software Developer', action: 'SpecsViewQr', unit: 689, category: "Mouse", status: "New", recent: "Robin Chuan", 
      category2: 'Installed Applications', description: ['Visual Studio Code', 'Purble Place', 'Github Desktop'],
      remarks: 'Remarks', information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024', 'Formatted- 01/22/2024', 'Formatted- 01/22/2024'], description2: "Cute Mouse", supplier: "Abenson", dop: "04/05/2024",
      serial: "654321"
      },
  ]); */
  const tableData = [
    { id: 1,
      branchCode: 'BOHL', 
      name: 'John Doe',
      units: [
        {unit: 122, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024", serial: "123456", category: "Monitor", recent: "Zoro Kun",},
        {unit: 123, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "12/16/2019", serial: "347905", category: "Monitor", recent: "Zoro Kun",},
      ],
      position: 'Front End Developer',
      action: 'SpecsViewQr',
      category2: 'Installed Applications',
      description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
      remarks: 'Remarks',
      information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
    },
    { id: 2,
      branchCode: 'BOHL', 
      name: 'Jane Smith',
      units: [
        {unit: 124, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024", serial: "123456", category: "Monitor", recent: "Zoro Kun",},
        {unit: 125, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/02/2024", serial: "657438", category: "Monitor", recent: "Zoro Kun",},
        {unit: 126, status: "Working", description2: "22 inches Acer HDMI", supplier: "Bohol Republics", dop: "06/08/2021", serial: "076945", category: "Monitor", recent: "Zoro Kun",},
      ],
      position: 'Front End Developer',
      action: 'SpecsViewQr',
      category2: 'Installed Applications',
      description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
      remarks: 'Remarks',
      information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
    },
    { id: 3,
      branchCode: 'BOHL', 
      name: 'Angeleen Darunday',
      units: [
        {unit: 127, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024", serial: "123456", category: "Monitor", recent: "Zoro Kun",},
      ],
      position: 'Front End Developer',
      action: 'SpecsViewQr',
      category2: 'Installed Applications',
      description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
      remarks: 'Remarks',
      information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
    },
    { id: 4,
      branchCode: 'HO', 
      name: 'Janrey Iyog',
      units: [
        {unit: 140, status: "Working", description2: "Acer 21.5''-SA2220", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "0012480134722X00", category: "Monitor", recent: "N/A",},
        {unit: 141, status: "Working", description2: "Intel Code i3- H410MH V2", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "232550068468", category: "Processor", recent: "N/A",},
        {unit: 142, status: "Working", description2: "8GB DDR4", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "022577B4", category: "RAM", recent: "N/A",},
        {unit: 143, status: "Working", description2: "120GB Kingston SA400S37120G", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "N/A", category: "SSD", recent: "N/A",},
        {unit: 144, status: "Working", description2: "1TB- ST1000DM010", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "ZN1Q0DX4", category: "HDD", recent: "N/A",},
        {unit: 145, status: "Working", description2: "APC 625- BX625CI-MS", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "3B1717X13290", category: "UPS", recent: "N/A",},
      ],
      position: 'IT Staff II',
      action: 'SpecsViewQr',
      category2: 'Installed Applications',
      description: ['Adobe Acrobat', 'Adobe Photoshop 2020', 'Anydesk', 'CPUZ', 'Package', 'Epson L120 & L3210',
        'ESET ANtivirus', 'Free Download Manager', 'Google', 'Internet Download Manager', 'Lan Messenger', 'Microsoft Edge', 'MS Office 2013', 'MLWapp',
        'OBS Studio', 'Opera Browser', 'PowerISO', 'Viber', 'VLC', 'WinRar', 'Wondershare'
      ],
      remarks: 'Remarks',
      information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
    },
  ];

  const openSpecsData = (tableData) => {
    return {
      id: tableData.id,
      name: tableData.name,
      units: tableData.units
    }
  }

  const openViewData = (tableData) => {
    return {
      units: tableData.units,
      branchCode: tableData.branchCode,
      name: tableData.name,
      position: tableData.position,
      id: tableData.id,
      category2: tableData.category2,
      description: tableData.description,
      remarks: tableData.remarks,
      information: tableData.information
    };
  };

  const generateQRCodeData = (tableData) => {
    return {
      id: tableData.id,
      data: `${tableData.id}`
    };
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
  return (
    <>
    <TableContainer component={Paper} className='w-full table-container'>
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
          {tableData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align='center'>{row.id}</TableCell>
              <TableCell align='center'>{row.branchCode}</TableCell>
              <TableCell align='center'><b>{row.name}</b><br /><i>{row.position}</i></TableCell>
              <TableCell align='center'>
                {row.action.includes('Specs') && (
                  <Button className='hover:text-blue-500' onClick={() => openSpecsPopup(openSpecsData(row))}>
                    <FontAwesomeIcon icon={faGears} />
                  </Button>
                )}
                {row.action.includes('View') && (
                  <Button className='hover:text-blue-500' onClick={() => openViewPopup(openViewData(row))}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Button>
                )}
                {row.action.includes('Qr') && (
                  <Button className='hover:text-blue-500' onClick={() => openQrPopup(generateQRCodeData(row))}>
                    <FontAwesomeIcon icon={faQrcode} />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 15, 20, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(event, newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<Typography variant="subtitle" fontWeight={600}>Entries Per Page:</Typography>}
      />
    </TableContainer>
    <Specs isOpen={isSpecsPopupOpen} onClose={closeSpecsPopup} specsData={specsData} />
    <View isOpen={isViewPopupOpen} onClose={closeViewPopup} viewData={viewData} />
    <QrCode isOpen={isQrPopupOpen} onClose={closeQrPopup} qrCodeData={qrCodeData} />
    </>
  );
};

 // Example data of the Table/List of Computers this will be rendered to Specs, View, and Qr
 export const tableData = [
  { id: 1,
    branchCode: 'BOHL', 
    name: 'John Doe',
    units: [
      {unit: 122, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024", serial: "123456", category: "Monitor", recent: "Zoro Kun",},
      {unit: 123, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "12/16/2019", serial: "347905", category: "Monitor", recent: "Zoro Kun",},
    ],
    position: 'Front End Developer',
    action: 'SpecsViewQr',
    category2: 'Installed Applications',
    description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
    remarks: 'Remarks',
    information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
  },
  { id: 2,
    branchCode: 'BOHL', 
    name: 'Jane Smith',
    units: [
      {unit: 124, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024", serial: "123456", category: "Monitor", recent: "Zoro Kun",},
      {unit: 125, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/02/2024", serial: "657438", category: "Monitor", recent: "Zoro Kun",},
      {unit: 126, status: "Working", description2: "22 inches Acer HDMI", supplier: "Bohol Republics", dop: "06/08/2021", serial: "076945", category: "Monitor", recent: "Zoro Kun",},
    ],
    position: 'Front End Developer',
    action: 'SpecsViewQr',
    category2: 'Installed Applications',
    description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
    remarks: 'Remarks',
    information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
  },
  { id: 3,
    branchCode: 'BOHL', 
    name: 'Angeleen Darunday',
    units: [
      {unit: 127, status: "Working", description2: "22 inches Acer HDMI", supplier: "Thinking Tools, Inc.", dop: "01/22/2024", serial: "123456", category: "Monitor", recent: "Zoro Kun",},
    ],
    position: 'Front End Developer',
    action: 'SpecsViewQr',
    category2: 'Installed Applications',
    description: ['Microsoft Office', 'Google Chrome', 'Github Desktop'],
    remarks: 'Remarks',
    information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
  },
  { id: 4,
    branchCode: 'HO', 
    name: 'Janrey Iyog',
    units: [
      {unit: 140, status: "Working", description2: "Acer 21.5''-SA2220", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "0012480134722X00", category: "Monitor", recent: "N/A",},
      {unit: 141, status: "Working", description2: "Intel Code i3- H410MH V2", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "232550068468", category: "Processor", recent: "N/A",},
      {unit: 142, status: "Working", description2: "8GB DDR4", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "022577B4", category: "RAM", recent: "N/A",},
      {unit: 143, status: "Working", description2: "120GB Kingston SA400S37120G", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "N/A", category: "SSD", recent: "N/A",},
      {unit: 144, status: "Working", description2: "1TB- ST1000DM010", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "ZN1Q0DX4", category: "HDD", recent: "N/A",},
      {unit: 145, status: "Working", description2: "APC 625- BX625CI-MS", supplier: "Gaisano Interpace", dop: "10/11/2023", serial: "3B1717X13290", category: "UPS", recent: "N/A",},
    ],
    position: 'IT Staff II',
    action: 'SpecsViewQr',
    category2: 'Installed Applications',
    description: ['Adobe Acrobat', 'Adobe Photoshop 2020', 'Anydesk', 'CPUZ', 'Package', 'Epson L120 & L3210',
      'ESET ANtivirus', 'Free Download Manager', 'Google', 'Internet Download Manager', 'Lan Messenger', 'Microsoft Edge', 'MS Office 2013', 'MLWapp',
      'OBS Studio', 'Opera Browser', 'PowerISO', 'Viber', 'VLC', 'WinRar', 'Wondershare'
    ],
    remarks: 'Remarks',
    information: ['Cleaned- 04/05/2024', 'Formatted- 01/22/2024'],
  },
];
//END OF LIST OF COMPUTERS

function Computers() {
    const [inputValues, setInputValues] = useState(['']);

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
                <div style={{ flex: 2, paddingBottom: '50px', marginRight: '80px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Managed Computers</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Computers</p>
                    <br/> <br/>
                    <div className='w-full h-full ml-10'>
                        <div className='pl-6'>
                        {/* search thru branch code */}
                                <p className='text-xl font-semibold pt-4 pl-4'>Search</p>
                                <div className='flex'>
                                <SearchableDropdown
                                    options={["BOHL", "DSMT", "DSMT2", "DSMAO", "DSMBN"]}
                                    placeholder="Enter keyword..."
                                    onSelect={(option) => {
                                    const event = { target: { value: option } };
                                    handleChange(4, event);
                                    }}
                                />
                                </div>
                    </div>
                    <div className='w-full max-h-full border-gray-300 shadow-2xl rounded-xl mt-4'>
                        <div>
                       <TableComponent/>
                        {/* list of computers */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Computers;