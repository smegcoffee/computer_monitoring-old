import React, { useState } from 'react';
import SideBar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, TablePagination } from '@mui/material';
import Add from './Add';
import EditSet from './Editset';
import axios from '../../api/axios';

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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  const rows = [
    { id: 1, dateOfPurchase: '2024-05-20', category: 'Electronics', description: 'Laptop', supplier: 'TechStore', serialNo: '123456', status: 'Available', users: 'John Doe' },
    // Add more rows as needed
  ];

function CompSet(){
    const classes = useStyles();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openEditPopup = () => {
        setEditPopupOpen(true);
      };

      const closeEditPopup = () => {
        setEditPopupOpen(false);
      };

      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
            return(
                <div className='w-full max-h-max rounded-xl'>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className='bg-red-200'>
                    <TableCell align='center'>
                        <p className='font-semibold text-base'>ID</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>DATE OF PURCHASE</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>CATEGORY</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>DESCRIPTION</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>SUPPLIER</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>SERIAL NO.</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>STATUS</p>
                    </TableCell>
                    <TableCell align='center'>
                    <p className='font-semibold text-base'>USERS</p>
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align='center'>{row.id}</TableCell>
                        <TableCell align='center'>{row.dateOfPurchase}</TableCell>
                        <TableCell align='center'>{row.category}</TableCell>
                        <TableCell align='center'>{row.description}</TableCell>
                        <TableCell align='center'>{row.supplier}</TableCell>
                        <TableCell align='center'>{row.serialNo}</TableCell>
                        <TableCell align='center'>{row.status}</TableCell>
                        <TableCell align='center'><button onClick={openEditPopup} >{row.users}</button></TableCell>
                        <EditSet isOpen={isEditPopupOpen} onClose={() => closeEditPopup('editset')} />
                    </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={8} />
                        </TableRow>
                    )}
                </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 15, 20, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => handleChangePage(event, newPage)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={<Typography variant="subtitle" fontWeight={600}>Entries Per Page:</Typography>}
                />
            </TableContainer>
            </div>
    );
}

function Set(){
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [user, setUser] = useState('');

    const handleUser = (event) => {
        setUser(event.target.value);
      };

    const openAddPopup = () => {
        setAddPopupOpen(true);
      };

      const closeAddPopup = () => {
        setAddPopupOpen(false);
      };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Setup Computer Set</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Setup</p>
                    <br/> <br/>
                    <div className='flex justify-center items-center mr-10'>
                        <div className='flex justify-end flex-grow'>
                            <div>
                                <input
                                type= "text"
                                value={user}
                                onChange={handleUser}
                                placeholder='Search User...'
                                className='bg-gray-100 border border-transparent rounded-xl w-96 h-9 mr-5 pl-3 mt-1'
                                />
                            </div>
                            <button onClick={openAddPopup} className='bg-red-400 border border-transparent rounded-full text-white pb-2 pt-2 pr-4 pl-4 text-base font-semibold'>
                                Assign Computer Set User
                                </button>
                        </div>
                        <Add isOpen={isAddPopupOpen} onClose={() => closeAddPopup('add')} />
                        </div>
                        <div className='flex justify-center items-center mt-5 ml-10 mr-10'>
                            <CompSet/>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Set;