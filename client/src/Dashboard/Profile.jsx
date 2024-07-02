import React, { useState, useEffect, useRef } from "react";
import smct from "../img/smct.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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

const SearchableDropdown = ({ options, placeholder, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option);
    onSelect(option);
    setIsOpen(false);
  };
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
    <div ref={dropdownRef} className="relative flex items-center mb-4">
      <input
        type="text"
        className="w-full h-12 px-4 border border-gray-300 rounded-md"
        placeholder={placeholder}
        value={user ? user.data.branchCode : searchTerm}
        onChange={handleInputChange}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md top-full">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function Placeholder() {
  const [inputValues, setInputValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("aaa");
  };
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
    <div className="w-full max-w-2xl p-4 mt-10 rounded">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-1/2 h-12 px-4 mr-2 border border-gray-300 rounded-md"
            placeholder="First Name"
            value={user ? user.data.firstName : inputValues[0]}
            onChange={(event) => handleChange(0, event)}
          />
          <input
            type="text"
            className="w-1/2 h-12 px-4 ml-2 border border-gray-300 rounded-md"
            placeholder="Last Name"
            value={user ? user.data.lastName : inputValues[1]}
            onChange={(event) => handleChange(1, event)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-1/2 h-12 px-4 mr-2 border border-gray-300 rounded-md"
            placeholder="Contact Number"
            value={user ? user.data.contactNumber : inputValues[2]}
            onChange={(event) => handleChange(2, event)}
          />
          <input
            type="text"
            className="w-1/2 h-12 px-4 ml-2 border border-gray-300 rounded-md"
            placeholder="Email"
            value={user ? user.data.email : inputValues[3]}
            onChange={(event) => handleChange(3, event)}
          />
        </div>
        <SearchableDropdown
          options={["BOHL", "DSMT", "DSMT2", "DSMAO", "DSMBN"]}
          placeholder="Select Branch Code"
          onSelect={(option) => {
            const event = { target: { value: option } };
            handleChange(4, event);
          }}
        />
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full h-12 px-4 border border-gray-300 rounded-md"
            placeholder="Username"
            value={user ? user.data.username : inputValues[5]}
            onChange={(event) => handleChange(5, event)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="password"
            className="w-full h-12 px-4 border border-gray-300 rounded-md"
            placeholder="Password"
            value={inputValues[6]}
            onChange={(event) => handleChange(6, event)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="password"
            className="w-full h-12 px-4 border border-gray-300 rounded-md"
            placeholder="Confirm Password"
            value={inputValues[7]}
            onChange={(event) => handleChange(7, event)}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex gap-2 pb-10">
            <Link to="/dashboard">
              <button className="h-10 mt-10 font-semibold text-white bg-gray-600 w-44 rounded-xl">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="h-10 mt-10 font-semibold text-white bg-blue-600 w-44 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

class OpenFolder extends React.Component {
  handleClick = () => {
    // Trigger file explorer opening
    this.openFileExplorer();
  };

  openFileExplorer() {
    // Code to open file explorer will depend on browser/OS
    // For security reasons, browsers don't allow direct control over the file system
    // However, you can simulate this behavior by allowing the user to choose files using <input type="file"> element

    // Example:
    const input = document.createElement("input");
    input.type = "file";
    input.click();
  }

  render() {
    return (
      <div className="folder" onClick={this.handleClick}>
        <p className="font-normal text-center text-gray-600 bg-gray-100 cursor-pointer hover:bg-gray-300">
          Change Photo
          <FontAwesomeIcon icon={faCamera} className="pl-2" />
        </p>
      </div>
    );
  }
}

const Profile = () => {
  // Example profile picture URL
  const profilePictureUrl = "https://example.com/profile-picture.jpg";

  return (
    <div>
      <Header />
      <div>
        <img
          src={smct}
          alt="SMCT Logo"
          className="block h-32 pt-5 ml-10 w-72"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-64 h-64 p-4 border shadow-xl rounded-xl">
          <div className="flex items-center justify-center">
            {/* Display profile picture */}
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="rounded-full w-36 h-36"
            />
          </div>
          <OpenFolder />
          <p className="pt-2 text-lg font-semibold text-center">
            Angeleen Darunday
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Placeholder />
      </div>
    </div>
  );
};

export default Profile;
