import { useState, useEffect } from "react";
import smct from "../img/smct.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faDesktop,
  faQrcode,
  faWrench,
  faComputer,
  faX,
  faFile,
  faArrowsTurnToDots,
  faUsers,
  faAngleRight,
  faAngleDown,
  faCodeBranch,
  faChair,
  faBoxesPacking,
  faBuildingUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SideBar({ isSidebarOpen, toggleSidebar, setTitle }) {
  const [activeItem, setActiveItem] = useState();
  const [setupOpen, setSetupOpen] = useState(false);
  const [transferedOpen, setTransferedOpen] = useState(false);
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setTitle("Dashboard");
        setActiveItem("dashboard");
        break;
      case "/computers":
        setTitle("Computers");
        setActiveItem("computers");
        break;
      case "/qr":
        setTitle("QR");
        setActiveItem("qr");
        break;
      case "/transfered-units":
        setTitle("Transfer Units");
        setActiveItem("transfered-units");
        break;
      case "/transfered-branch-units":
        setTitle("Transfered Branch Units");
        setActiveItem("transfered-branch-units");
        break;
      case "/all-units":
        setTitle("All Units");
        setActiveItem("all-units");
        break;
      case "/all-logs":
        setTitle("All Logs");
        setActiveItem("all-logs");
        break;
      case "/branches":
        setTitle("Branches");
        setActiveItem("branches");
        break;
      case "/positions":
        setTitle("Positions");
        setActiveItem("positions");
        break;
      case "/categories":
        setTitle("Categories");
        setActiveItem("categories");
        break;
      case "/suppliers":
        setTitle("Suppliers");
        setActiveItem("suppliers");
        break;
      case "/departments":
        setTitle("Departments");
        setActiveItem("departments");
        break;
      case "/unit":
        setTitle("Units");
        setActiveItem("unit");
        break;
      case "/set":
        setTitle("Computer Sets");
        setActiveItem("set");
        break;
      case "/user":
        setTitle("Setup Users");
        setActiveItem("user");
        break;
      case "/setup/branch-units":
        setTitle("Branch Units");
        setActiveItem("setup-branch-units");
        break;
      case "/admin/users-list":
        setTitle("Users Lists");
        setActiveItem("users-list");
        break;
      case "/profile":
        setTitle("Profile");
        break;
      default:
        setActiveItem("dashboard");
    }
  }, [pathname, setTitle]);

  const handleSetupOpen = () => {
    setSetupOpen((prev) => !prev);
  };
  const handleTransferedOpen = () => {
    setTransferedOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed h-screen md:static ${
        isSidebarOpen ? "left-0 w-80" : "-left-full w-80"
      } top-0 h-full shadow-[4px_0_10px_rgba(0,0,0,0.25)] bg-white transition-all duration-300 z-[51]`}
    >
      <div className="pr-5 w-72">
        <div>
          <button
            type="button"
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
        <div className="w-full mt-5 ml-10 overflow-y-auto max-h-[calc(100vh-105px)]">
          <Link to="/dashboard">
            <button
              type="button"
              className={`text-lg font-medium pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
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
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
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
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "qr" ? "bg-blue-500 text-white active" : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faQrcode} /> Scan QR Codes
            </button>
          </Link>
          <Link to="/all-units">
            <button
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
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
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "all-logs" ? "bg-blue-500 text-white active" : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faFile} /> All Logs
            </button>
          </Link>
          <Link to="/branches">
            <button
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "branches" ? "bg-blue-500 text-white active" : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faCodeBranch} /> Branches
            </button>
          </Link>
          <Link to="/categories">
            <button
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "categories"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faList} /> Categories
            </button>
          </Link>
          <Link to="/positions">
            <button
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "positions"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faChair} /> Positions
            </button>
          </Link>
          <Link to="/suppliers">
            <button
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "suppliers"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faBoxesPacking} /> Suppliers
            </button>
          </Link>
          <Link to="/departments">
            <button
              type="button"
              className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                activeItem === "departments"
                  ? "bg-blue-500 text-white active"
                  : ""
              } rounded-3xl h-10 cursor-pointer`}
            >
              <FontAwesomeIcon icon={faBuildingUser} /> Departments
            </button>
          </Link>
          {isAdmin && (
            <Link to="/admin/users-list">
              <button
                type="button"
                className={`text-lg font-medium mt-5 pl-5 pt-0.5 w-full text-justify hover:bg-blue-400 hover:text-white ${
                  activeItem === "users-list"
                    ? "bg-blue-500 text-white active"
                    : ""
                } rounded-3xl h-10 cursor-pointer`}
              >
                <FontAwesomeIcon icon={faUsers} /> Users List
              </button>
            </Link>
          )}
          <button
            type="button"
            onClick={handleTransferedOpen}
            className={`cursor-pointer text-lg flex justify-between font-medium mt-5 pl-5 pt-0.5 rounded-3xl h-10`}
          >
            <div>
              <FontAwesomeIcon icon={faArrowsTurnToDots} /> Transfered Units
            </div>
            <div>
              <FontAwesomeIcon
                icon={transferedOpen ? faAngleDown : faAngleRight}
              />
            </div>
          </button>

          {transferedOpen && (
            <div className="p-3 text-center bg-gray-200 rounded-lg">
              <Link to="/transfered-units">
                <button
                  type="button"
                  className={`text-md font-medium mt-5 px-6 text-justify pt-0.5 hover:bg-blue-400 hover:text-white ${
                    activeItem === "transfered-units"
                      ? "bg-blue-500 text-white active"
                      : ""
                  } rounded  h-10 w-full cursor-pointer`}
                >
                  User Unit Transfered
                </button>
              </Link>
              <Link to="/transfered-branch-units">
                <button
                  type="button"
                  className={`text-sm font-medium mt-5 mb-6 px-6 text-justify pt-0.5 hover:bg-blue-400 hover:text-white ${
                    activeItem === "transfered-branch-units"
                      ? "bg-blue-500 text-white active"
                      : ""
                  } rounded h-10 w-full cursor-pointer`}
                >
                  Branch Unit Transfered
                </button>
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={handleSetupOpen}
            className={`cursor-pointer text-lg flex justify-between font-medium mt-5 pl-5 pt-0.5 rounded-3xl h-10`}
          >
            <div>
              <FontAwesomeIcon icon={faWrench} /> Setup
            </div>
            <div>
              <FontAwesomeIcon icon={setupOpen ? faAngleDown : faAngleRight} />
            </div>
          </button>
          {setupOpen && (
            <div className="p-3 text-center bg-gray-200 rounded-lg">
              <Link to="/unit">
                <button
                  type="button"
                  className={`text-md font-medium mt-5 px-8 text-justify pt-0.5 hover:bg-blue-400 hover:text-white ${
                    activeItem === "unit" ? "bg-blue-500 text-white active" : ""
                  } rounded h-10 w-full cursor-pointer`}
                >
                  Unit
                </button>
              </Link>
              <Link to="/set">
                <button
                  type="button"
                  className={`text-sm font-medium mt-5 px-8 text-justify pt-0.5 hover:bg-blue-400 hover:text-white ${
                    activeItem === "set" ? "bg-blue-500 text-white active" : ""
                  } rounded h-10 w-full cursor-pointer`}
                >
                  Assign Computer Set
                </button>
              </Link>
              <Link to="/setup/branch-units">
                <button
                  type="button"
                  className={`text-sm font-medium mt-5 px-8 text-justify pt-0.5 hover:bg-blue-400 hover:text-white ${
                    activeItem === "setup-branch-units"
                      ? "bg-blue-500 text-white active"
                      : ""
                  } rounded h-10 w-full cursor-pointer`}
                >
                  Assign Branch Unit
                </button>
              </Link>
              <Link to="/user">
                <button
                  type="button"
                  className={`text-md font-medium mt-5 px-8 text-justify pt-0.5 hover:bg-blue-400 hover:text-white ${
                    activeItem === "user" ? "bg-blue-500 text-white active" : ""
                  } rounded h-10 w-full cursor-pointer`}
                >
                  User
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
