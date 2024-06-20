import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Outlet, Navigate } from 'react-router-dom';
import Loading from './Loading';

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
        return <Loading />;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
