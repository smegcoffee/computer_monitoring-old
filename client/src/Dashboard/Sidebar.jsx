import React, { useState, useEffect } from "react";
import smct from "../img/smct.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faDesktop,
  faQrcode,
  faWrench,
  faComputer,
  faX,
  faTimes,
  faFile,
  faArrowsTurnToDots,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useAdmin } from "../context/AdminContext";

function SideBar({ isSidebarOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const hashPath = window.location.pathname.replace("/monitoring", "");
    switch (hashPath) {
      case "/dashboard":
        setActiveItem("dashboard");
        break;
      case "/computers":
        setActiveItem("computers");
        break;
      case "/qr":
        setActiveItem("qr");
        break;
      case "/transfered-units":
        setActiveItem("transfered-units");
        break;
      case "/all-units":
        setActiveItem("all-units");
        break;
      case "/all-logs":
        setActiveItem("all-logs");
        break;
      case "/unit":
        setActiveItem("unit");
        break;
      case "/set":
        setActiveItem("set");
        break;
      case "/user":
        setActiveItem("user");
        break;
      case "/admin/users-list":
        setActiveItem("users-list");
        break;
      default:
        setActiveItem("dashboard");
    }
  }, []);

  return (
    <div
      className={`fixed md:static ${
        isSidebarOpen ? "left-0 w-80 overflow-y-auto" : "-left-full w-72"
      } top-0 h-full bg-white transition-all duration-300 z-50`}
    >
      <div className="h-full w-72">
        <div>
          <button
            onClick={toggleSidebar}
            className="mt-4 text-black float-end md:hidden"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <img
            src={smct}
            alt="SMCT Logo"
            className="block pt-5 ml-10 w-60 h-28"
          />
        </div>
        <div className="mt-5 ml-10">
          <Link to="/dashboard">
            <button
              className={`text-lg font-medium pl-5 pt-0.5 w-full text-justify ${
                activeItem === "dashboard"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </button>
          </Link>
          <Link to="/computers">
            <button
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${
                activeItem === "computers"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faDesktop} /> Monitored Computers
            </button>
          </Link>
          <Link to="/qr">
            <button
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${
                activeItem === "qr" ? "bg-blue-500 text-white active" : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faQrcode} /> Scan QR Codes
            </button>
          </Link>
          <Link to="/transfered-units">
            <button
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${
                activeItem === "transfered-units"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faArrowsTurnToDots} /> Transfered Units
            </button>
          </Link>
          <Link to="/all-units">
            <button
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${
                activeItem === "all-units"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faComputer} /> All Units
            </button>
          </Link>
          <Link to="/all-logs">
            <button
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify ${
                activeItem === "all-logs" ? "bg-blue-500 text-white active" : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faFile} /> All Logs
            </button>
          </Link>
          <p
            className={`text-lg font-medium mt-5 pl-5 pt-0.5 rounded-3xl h-10 cursor-default`}
          >
            <FontAwesomeIcon icon={faWrench} /> Setup
          </p>
          <Link to="/unit">
            <button
              className={`text-lg font-medium mt-5 pl-8 text-justify pt-0.5 ${
                activeItem === "unit" ? "bg-blue-500 text-white active" : ""
              } rounded-tr-none rounded-bl-none rounded-tl-full rounded-br-full h-10 w-40 ml-8 cursor-pointer`}
            >
              Setup Unit
            </button>
          </Link>
          <Link to="/set">
            <button
              className={`text-lg font-medium mt-5 pl-8 text-justify pt-0.5 ${
                activeItem === "set" ? "bg-blue-500 text-white active" : ""
              } rounded-tl-none rounded-br-none rounded-tr-full rounded-bl-full h-10 w-56 ml-8 cursor-pointer`}
            >
              Setup Computer Set
            </button>
          </Link>
          <Link to="/user">
            <button
              className={`text-lg font-medium mt-5 pl-8 text-justify pt-0.5 ${
                activeItem === "user" ? "bg-blue-500 text-white active" : ""
              } rounded-tr-none rounded-bl-none rounded-tl-full rounded-br-full h-10 w-44 ml-8 cursor-pointer`}
            >
              Setup Users
            </button>
          </Link>
          {isAdmin && (
            <Link to="/admin/users-list">
              <button
                className={`text-lg font-medium mt-5 pl-8 text-justify pt-0.5 ${
                  activeItem === "users-list"
                    ? "bg-blue-500 text-white active"
                    : ""
                } rounded-tr-none rounded-bl-none rounded-tl-full rounded-br-full h-10 w-44 ml-8 cursor-pointer`}
              >
                Users List
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
