import React from "react";
import SideBar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
//import { QrReader } from 'react-qr-reader';
import Codes from "./Codes";
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

function QrC() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar />
        </div>
        <div style={{ flex: 2, paddingBottom: "50px" }}>
          <p className="pt-10 ml-10 text-2xl font-normal">Scan QR Codes</p>
          <p className="ml-10 text-lg font-light">
            <Link to="/dashboard" className="text-blue-800">
              Home
            </Link>{" "}
            &gt; Scan QR
          </p>
          <br /> <br />
          <div className="flex items-center justify-center text-center">
            <Codes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrC;
