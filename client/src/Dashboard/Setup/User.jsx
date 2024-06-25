import React, { useState } from 'react';
import SideBar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { Autocomplete, Button, Card, CardContent, Container, Grid, TextField } from '@mui/material';
import {positionData, branchCodeData} from '../../data/setUpUserData';
import Swal from 'sweetalert2';

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

function User(){
    const [position, setPosition] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [user, setUser] = useState({
        name: '',
        position: '',
        branchCode: ''
    });

    const handleSubmitUser = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('api/insertApiForUser', {
                name: user.name,
                position: user.position,
                branchCode: user.branchCode
            });
            if (response.data.status === true) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        title: "User added!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        window.location = "/user";
                    });
            }
            console.log('Adding user:', response.data);
        } catch(error){
            console.error('Error in adding user:', error);
            if (error.response && error.response.data) {
                console.log('Backend error response:', error.response.data);
            } else{
                console.log('ERROR!');
            }
        }finally{

        }
    };

    const handleSubmitPosition = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('api/insertApiForPosition', {
                position: position
            });
            if (response.data.status === true) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        title: "Position added!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        window.location = "/user";
                    });
            }
            console.log('Adding position:', response.data);
        } catch(error){
            console.error('Error in adding position:', error);
            if (error.response && error.response.data) {
                console.log('Backend error response:', error.response.data);
            } else{
                console.log('ERROR!');
            }
        }finally{

        }
    };

    const handleSubmitBranchCode = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('api/insertApiForBranchCode', {
                branchCode: branchCode
            });
            if (response.data.status === true) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        title: "Branch Code added!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        window.location = "/user";
                    });
            }
            console.log('Adding branch code:', response.data);
        } catch(error){
            console.error('Error in adding branch code:', error);
            if (error.response && error.response.data) {
                console.log('Backend error response:', error.response.data);
            } else{
                console.log('ERROR!');
            }
        }finally{

        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px'}}>
                    <p className='font-normal text-2xl pt-10 ml-10'>Setup Computer User</p>
                    <p className='font-light text-lg ml-10'><Link to="/dashboard" className='text-blue-800'>Home</Link> &gt; Setup</p>
                    <br/> <br/>
                    <div className='flex justify-center items-center ml-10 mr-10'>
                        <div className='border border-transparent rounded-xl shadow-lg max-h-max w-1/2 mr-5'> 
                        <form onSubmit={handleSubmitPosition}>
                            <div className='flex items-center text-center justify-center'>
                                <div className='bg-red-200 h-10 w-full rounded-tl-xl rounded-tr-xl'>
                                    <p className='font-semibold text-base mt-1.5'>ADD NEW POSITION</p>
                                </div>
                            </div>
                                <div className='flex justify-center pt-5 pr-5 pl-5 pb-4'>
                                  <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    placeholder="Input position..."
                                    className='bg-gray-200 border border-transparent rounded-xl w-3/4 h-9 pl-5'
                                  />
                                </div>
                                <div className='flex justify-center'>
                                  <button type='submit' className='mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
                                    ADD
                                  </button>
                                </div>
                                </form>
                            </div>
                        <div className='border border-transparent rounded-xl shadow-lg max-h-max w-1/2'>
                            <form onSubmit={handleSubmitBranchCode}>
                            <div className='flex items-center text-center justify-center'>
                                    <div className='bg-red-200 h-10 w-full rounded-tl-xl rounded-tr-xl'>
                                    <p className='font-semibold text-base mt-1.5'>ADD NEW BRANCH CODE</p>
                                    </div>
                                </div>
                                <div className='flex justify-center pt-5 pr-5 pl-5 pb-4'>
                                  <input
                                    type="text"
                                    value={branchCode}
                                    onChange={(e) => setBranchCode(e.target.value)}
                                    placeholder="Input branch code..."
                                    className='bg-gray-200 border border-transparent rounded-xl w-3/4 h-9 pl-5'
                                  />
                                </div>
                                <div className='flex justify-center'>
                                  <button type='submit' className='mb-5 border border-transparent duration-700 bg-green-600 hover:bg-green-700 text-white rounded-3xl w-32 h-9 text-base font-semibold'>
                                    ADD
                                  </button>
                                </div>
                                </form>
                            </div>
                            </div>
                            <div className='flex-none mt-10'>
                            <Container>
                                <form onSubmit={handleSubmitUser}>
                                <Card>
                                    <h2 className='flex justify-center items-center bg-blue-200 p-5 text-2xl font-semibold'>SET UP USERS</h2>
                                    <CardContent>
                                    <Grid container className='flex p-5 text-center' alignItems='center' justifyContent='center'>
                                        <Grid item>
                                            <TextField
                                                value={user.name}
                                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                id='name-user'
                                                label='Name'
                                                variant='standard'
                                                style={{ marginRight: "20px", width: "300px" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                freeSolo
                                                id='position-user'
                                                disableClearable
                                                options={positionData}
                                                renderInput={(params) => (
                                                    <TextField
                                                    value={user.position}
                                                    onChange={(e) => setUser({...user, branchCode: e.target.value})}
                                                        {...params}
                                                        label='Position'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            type: 'search',
                                                        }}
                                                        variant='standard'
                                                        style={{ marginRight: "20px", width: "300px" }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                            freeSolo
                                            id='branchCode-user'
                                            disableClearable
                                            options={branchCodeData}
                                            renderInput={(params) => (
                                            <TextField
                                                value={user.branchCode}
                                                onChange={(e) => setUser({ ...user, branchCode: e.target.value })}
                                                {...params}
                                                label='Branch Code'
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: 'search',
                                                }}
                                                variant='standard'
                                                style={{ width: "300px" }}
                                            />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                style={{
                                                    marginTop: "20px",
                                                    width: "300px",
                                                    fontWeight: "550",
                                                    borderRadius: "100px",
                                                    fontSize: "16px",
                                                    backgroundColor: "green"
                                                }}
                                            >
                                                ADD
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </CardContent>
                                </Card>
                                </form>
                            </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;