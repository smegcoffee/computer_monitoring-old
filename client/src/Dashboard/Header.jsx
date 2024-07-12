import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ChatIcon from '@mui/icons-material/Chat';

function Header({ toggleSidebar }) {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <div className="flex items-center justify-between w-full h-20 bg-blue-800 pr-10">
        <button onClick={toggleSidebar} className="ml-4 text-white md:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="flex-grow text-center">
          <p className="text-sm font-bold text-white md:text-4xl">
            COMPUTER MONITORING SYSTEM
          </p>
        </div>
        {user && user.data && (
        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
        <Avatar alt={user.data.firstName} src=""/>
          </IconButton>
        </Tooltip>
      )}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        {user && user.data && (
        <Link to= "/profile">
        <MenuItem>
          <Avatar /> <b>{user.data.firstName} {user.data.lastName}</b>
        </MenuItem>
        </Link>
        )}
        <Divider style={{fontFamily: "'Roboto', sans-serif", fontSize: "12px"}}>Other Links</Divider>
        <Link to="http://122.53.61.91:4000/" target="_blank" rel="noopener noreferrer">
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ConfirmationNumberIcon fontSize="small" />
          </ListItemIcon>
          Ticketing System
        </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <InsertDriveFileIcon fontSize="small" />
          </ListItemIcon>
          Request Form
        </MenuItem>
        <Link to="http://122.53.61.91:3000/" target="_blank" rel="noopener noreferrer">
        <MenuItem>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          SMCT Chat
        </MenuItem>
        </Link>
        <Divider/>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default Header;
