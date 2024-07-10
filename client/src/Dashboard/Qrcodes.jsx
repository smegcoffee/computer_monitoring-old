import React, { useState } from "react";
import SideBar from "./Sidebar";
import { Link } from "react-router-dom";
//import { QrReader } from 'react-qr-reader';
import Codes from "./Codes";
import Header from "./Header";

function QrC() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
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
