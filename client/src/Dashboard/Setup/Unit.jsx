import React from 'react';
import SideBar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      marginTop: theme.spacing(3),
      borderRadius: '12px', // Adjust the value according to your preference
    },
    //table: {
      //minWidth: 650,
    //},
  }));

const CustomTable = () => {
    const classes = useStyles();
    return (
      <div className={`${classes.root} border border-transparent rounded-xl shadow-lg max-h-max w-full mt-3`}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className='bg-red-200'>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>UNIT CODE</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>DATE OF PURCHASE</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>CATEGORY</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>DESCRIPTION</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>SUPPLIER</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>SERIAL NO.</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>STATUS</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Add Table Rows and Cells here */}
          </TableBody>
        </Table>
      </div>
    );
  }

  const CustomTableA = () => {
    const classes = useStyles();
    return (
      <div className={`${classes.root} border border-transparent rounded-xl shadow-lg max-h-max w-full mt-3`}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className='bg-blue-200'>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>UNIT CODE</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>DATE OF PURCHASE</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>CATEGORY</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>DESCRIPTION</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>SUPPLIER</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>SERIAL NO.</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-base mt-1.5'>STATUS</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Add Table Rows and Cells here */}
          </TableBody>
        </Table>
      </div>
    );
  }

function Unit() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Setup Unit</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Setup</p>
                    <br/> <br/>
                    <div className='flex justify-center items-center ml-10'>
                        <div className='border border-transparent rounded-xl shadow-lg h-56 w-1/2 mr-5'>
                            <div className='flex items-center text-center justify-center'>
                                <div className='bg-yellow-200 h-10 w-full rounded-tl-xl rounded-tr-xl'>
                                    <p className='font-semibold text-base mt-1.5'>ADD CATEGORY</p>
                                </div>
                            </div>
                            </div>
                        <div className='border border-transparent rounded-xl shadow-lg h-56 w-1/2'>
                            <div className='flex items-center text-center justify-center'>
                                    <div className='bg-yellow-200 h-10 w-full rounded-tl-xl rounded-tr-xl'>
                                    <p className='font-semibold text-base mt-1.5'>ADD SUPPLIER</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className='flex justify-center items-center ml-10'>
                      <CustomTableA/>
                    </div>
                    <div className='flex justify-center items-center ml-10'>
                    <CustomTable/>
                    </div>
                </div>
                <div style={{ flex: 'none', height: '100px'}}>
                    <p className='font-normal text-xl pt-10 pr-10'>Welcome, <Link to="/profile"><b>Angeleen Darunday</b></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Unit;