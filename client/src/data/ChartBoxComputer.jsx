import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { ChartBox } from '../Dashboard/Db2';

const ChartBoxComputer = () => {
    const [chartDataComputer, setChartDataComputer] = useState([]);

    useEffect(() => {
        const fetchChartDataComputer = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get('/api/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChartDataComputer(response.data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartDataComputer();
    }, []);

    const chartBoxComputer = {
        color: "brown",
        icon: <FontAwesomeIcon icon={faComputer} />,
        title: "Total Computers",
        number: chartDataComputer.totalComputers,
        dataKey: "Computers",
        percentage: 21,
        chartData: [
            { name: "Sun", Computers: 400 },
            { name: "Mon", Computers: 600 },
            { name: "Tue", Computers: 500 },
            { name: "Wed", Computers: 700 },
            { name: "Thu", Computers: 400 },
            { name: "Fri", Computers: 500 },
            { name: "Sat", Computers: 450 },
        ],
    };

    return (
        <ChartBox {...chartBoxComputer} />
    );
};

export default ChartBoxComputer;
