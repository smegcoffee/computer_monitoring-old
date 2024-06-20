import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Outlet, Navigate } from 'react-router-dom';

const AuthContext = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
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

    return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthContext;
