import React, { useState }from 'react';
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
    TextField,
  } from '@mui/material';
  import { tableData } from '../data/computerData';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    if (!value.trim()) {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setPage(0);
  };
  
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
    {/* search thru NAME */}
            <div className='flex mb-5'>
                  <TextField
                    label="Search User"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    variant="outlined"
                    fullWidth
                    sx={{width: 300}}
                    size='small'
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            </div>
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
          {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
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
        count={filteredData.length}
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

function Computers() {
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
                    <div className='w-full max-h-full mt-4'>
                        <div>
                       <TableComponent/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Computers;