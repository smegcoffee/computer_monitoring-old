import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { ChartBox } from '../Dashboard/Db2';

const ChartBoxUser = () => {
  const [chartDataUser, setChartDataUser] = useState([]);

  useEffect(() => {
    const fetchChartDataUser = async () => {
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
        setChartDataUser(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartDataUser();
  }, []);

  const chartBoxUser = {
    color: "#ffff00",
    icon: <FontAwesomeIcon icon={faUsers} />,
    title: "Total Users",
    number: chartDataUser.totalUsers,
    dataKey: "Users",
    percentage: 45,
    chartData: [
      { name: "Sun", Users: 400 },
      { name: "Mon", Users: 600 },
      { name: "Tue", Users: 500 },
      { name: "Wed", Users: 700 },
      { name: "Thu", Users: 400 },
      { name: "Fri", Users: 500 },
      { name: "Sat", Users: 450 },
    ],
  };

  return (
    <ChartBox {...chartBoxUser} />
  );
};

export default ChartBoxUser;
