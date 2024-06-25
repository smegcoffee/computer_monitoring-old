import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

const ChangePassword = () => {
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
        return <Loading />;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.data.request_new_password === 1) {
        return <Outlet />;
    } else {
        return <Navigate to="/dashboard" />;
    }

};

export default ChangePassword;
