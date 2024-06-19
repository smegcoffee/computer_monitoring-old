import React from 'react';
import SideBar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Dashboard from './Db2';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function Header() {

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
    return (
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

function DashBoard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <div>
                    <SideBar />
                </div>
                <div style={{ flex: 2, paddingBottom: '50px' }}>
                    <div className='grid gap-5 grid-cols-3'>
                        <div className='col-span-2 row-span-1'>
                            <p className='font-normal text-2xl pt-10 ml-10'>Dashboard</p>
                            <p className='font-light text-lg ml-10'>Home</p>
                        </div>
                        <div className='col-span-1 row-span-1 justify-end text-end'>
                            {user && user.data && (
                                <p className='font-normal text-lg pt-10 mr-14'>
                                    Welcome, <Link to="/profile"><b>{user.data.firstName} {user.data.lastName}</b></Link>
                                </p>
                            )}
                        </div>
                    </div>
                    <br /> <br />
                    <div className='ml-10 mr-10'>
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;