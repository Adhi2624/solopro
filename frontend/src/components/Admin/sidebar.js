import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="navbar navbar-vertical navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          College Admin
        </a>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="./">
                <i className="bi bi-house"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                <i className="bi bi-people"></i> Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/applications">
                <i className="bi bi-file-earmark-text"></i> Applications
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
