import React from "react";
import SideBar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dashboard from "./Db2";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";

function Header() {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        await axios.get("/api/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        window.location = "/login";
      } catch (error) {
        console.error("Error logging out:", error);
        Swal.fire("Error!", "Failed to log out. Please try again.", "error");
      }
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full h-20 bg-blue-800">
        <div className="flex-grow text-center">
          <p className="text-4xl font-bold text-white">
            COMPUTER MONITORING SYSTEM
          </p>
        </div>

        <Link onClick={handleLogout}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="mr-8 text-white"
          />{" "}
        </Link>
      </div>
    </div>
  );
}

function DashBoard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar />
        </div>
        <div style={{ flex: 2, paddingBottom: "50px" }}>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 row-span-1">
              <p className="pt-10 ml-10 text-2xl font-normal">Dashboard</p>
              <p className="ml-10 text-lg font-light">Home</p>
            </div>
            <div className="justify-end col-span-1 row-span-1 text-end">
              {user && user.data && (
                <p className="pt-10 text-lg font-normal mr-14">
                  Welcome,{" "}
                  <Link to="/profile">
                    <b>
                      {user.data.firstName} {user.data.lastName}
                    </b>
                  </Link>
                </p>
              )}
            </div>
          </div>
          <br /> <br />
          <div className="ml-10 mr-10">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
