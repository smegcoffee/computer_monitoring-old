import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { ChartBox } from '../Dashboard/Db2';

const ChartBoxRemark = () => {
    const [chartDataRemark, setChartDataRemark] = useState([]);

    useEffect(() => {
        const fetchChartDataRemark = async () => {
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
                setChartDataRemark(response.data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartDataRemark();
    }, []);

    const chartBox2 = {
        color: "orange",
        icon: <FontAwesomeIcon icon={faNoteSticky} />,
        title: "Total Remarks",
        number: chartDataRemark.totalRemarks,
        dataKey: "Remarks",
        percentage: 12,
        chartData: [
            { name: "Sun", Remarks: 400 },
            { name: "Mon", Remarks: 600 },
            { name: "Tue", Remarks: 500 },
            { name: "Wed", Remarks: 700 },
            { name: "Thu", Remarks: 400 },
            { name: "Fri", Remarks: 500 },
            { name: "Sat", Remarks: 450 },
        ],
    };

    return (
        <ChartBox {...chartBox2} />
    );
};

export default ChartBoxRemark;
