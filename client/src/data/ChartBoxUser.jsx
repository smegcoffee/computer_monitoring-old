import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { ChartBox } from "../Dashboard/Db2";

const ChartBoxUser = () => {
  const [chartDataUser, setChartDataUser] = useState([]);
  const [weeklyUsers, setWeeklyUsers] = useState([]);
  const [userPercent, setUserPercent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartDataUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChartDataUser(response.data);

        const usersData = response.data.weeklyUsers.map((day) => ({
          name: day.name.substring(0, 3),
          Users: day.users,
        }));

        setWeeklyUsers(usersData);
        setUserPercent(response.data.usersPercent);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartDataUser();
  }, []);

  const chartBoxUser = {
    color: "#ffff00",
    icon: <FontAwesomeIcon icon={faUsers} />,
    title: "Total Users",
    number: loading ? "Loading..." : chartDataUser.totalUsers,
    dataKey: "Users",
    percentage: loading ? "..." : userPercent,
    chartData: weeklyUsers,
  };

  return <ChartBox {...chartBoxUser} />;
};

export default ChartBoxUser;
