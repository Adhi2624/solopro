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
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";

const Sidebar = ({ isOpen, handleToggle }) => {
  const { dispatch } = useContext(DarkModeContext);

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
                <StoreIcon className="icon" />
                <span>Students</span>
              </li>
            </Link>
            <Link to="/mentors" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Mentors</span>
              </li>
            </Link>
            <Link to="/investors" style={{ textDecoration: "none" }}>
              <li>
                <LocalShippingIcon className="icon" />
                <span>Investors</span>
              </li>
            </Link>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
