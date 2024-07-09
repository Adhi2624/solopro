import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { DarkModeContext } from "../../context/darkModeContext";
import SchoolIcon from '@mui/icons-material/School';
import { useContext, useState } from "react";

const Sidebar = ({ isOpen, handleToggle }) => {
  const { dispatch } = useContext(DarkModeContext);
  const handleLogout = () => {
    // Remove items from localStorage
    
    localStorage.removeItem('user');

    // Redirect to login or home page
    // Example: Replace with your desired logout behavior
    window.location.href = '/'; // Redirect to login page after logout
};

  return (
    <div>
      <div className="toggleButton" onClick={handleToggle}>
      {isOpen ? (
          <ArrowBackIosIcon fontSize="small" className="icon" />
        ) : (
          <ArrowForwardIosIcon fontSize="small" className="icon" />
        )}
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">SOLOPRO</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>

            <p className="title">LISTS</p>
            <Link to="/students" style={{ textDecoration: "none" }}>
              <li>
                <CastForEducationIcon className="icon" />
                <span>Students</span>
              </li>
            </Link>
            <Link to="/mentors" style={{ textDecoration: "none" }}>
              <li>
                <SchoolIcon className="icon" />
                <span>Mentors</span>
              </li>
            </Link>
            <Link to="/investors" style={{ textDecoration: "none" }}>
              <li>
                <LocalShippingIcon className="icon" />
                <span>Investors</span>
              </li>
            </Link>
            <Link to="/Entrepreneur" style={{ textDecoration: "none" }}>
              <li>
                <SchoolIcon className="icon" />
                <span>Entrepreneur</span>
              </li>
            </Link>
            <p className="title">USER ACTION</p>

            <li>
              <ExitToAppIcon className="icon" />
              
              <span onClick={{handleLogout}}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
