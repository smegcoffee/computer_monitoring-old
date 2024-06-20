import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);
    const [authenticate, setAuthenticate] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setAuthenticate(false);
                    return;
                }
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setAuthenticate(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setAuthenticate(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (authenticate) {
        return (

            <div className="flex items-center justify-center h-screen">
                <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
