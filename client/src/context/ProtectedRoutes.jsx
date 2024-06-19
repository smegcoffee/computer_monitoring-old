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
                    setAuthenticate(false); // No token found, user is not authenticated
                    return;
                }
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data); // Set user data if authenticated
                setAuthenticate(false); // Set authentication check to false
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setAuthenticate(false); // Error occurred, user is not authenticated
            }
        };

        fetchUserProfile();
    }, []);

    // While checking authentication, don't render anything
    if (authenticate) {
        return null; // Or you can show a loading spinner or message
    }

    // Render based on authentication status
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
