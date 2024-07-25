import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { ChartBox } from "../Dashboard/Db2";

const ChartBoxRemark = () => {
  const [chartDataRemark, setChartDataRemark] = useState([]);
  const [weeklyRemarks, setWeeklyRemarks] = useState([]);
  const [remarkPercent, setRemarkPercent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartDataRemark = async () => {
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
        setChartDataRemark(response.data);
        const remarksData = response.data.weeklyRemarks.map((day) => ({
          name: day.name.substring(0, 3),
          Remarks: day.Remarks,
        }));

        setWeeklyRemarks(remarksData);
        setRemarkPercent(response.data.remarksPercent);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartDataRemark();
  }, []);

  const chartBox2 = {
    color: "orange",
    icon: <FontAwesomeIcon icon={faNoteSticky} />,
    title: "Total Remarks",
    number: loading ? "Loading..." : chartDataRemark.totalRemarks,
    dataKey: "Remarks",
    percentage: loading ? "..." : remarkPercent,
    chartData: weeklyRemarks,
  };

  return <ChartBox {...chartBox2} />;
};

export default ChartBoxRemark;
