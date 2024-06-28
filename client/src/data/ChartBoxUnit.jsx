import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { ChartBox } from '../Dashboard/Db2';

const ChartBoxUser = () => {
  const [chartDataUnit, setChartDataUnit] = useState([]);

  useEffect(() => {
    const fetchChartDataUnit = async () => {
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
        setChartDataUnit(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartDataUnit();
  }, []);

  const chartBox1 = {
    color: "#000080",
    icon: <FontAwesomeIcon icon={faDesktop} />,
    title: "Total Units",
    number: chartDataUnit.totalUnits,
    dataKey: "Units",
    percentage: 25,
    chartData: [
      { name: "Sun", Units: 400 },
      { name: "Mon", Units: 600 },
      { name: "Tue", Units: 500 },
      { name: "Wed", Units: 700 },
      { name: "Thu", Units: 400 },
      { name: "Fri", Units: 500 },
      { name: "Sat", Units: 450 },
    ],
  };

  return (
    <ChartBox {...{...chartBox1}} />
  );
};

export default ChartBoxUser;
