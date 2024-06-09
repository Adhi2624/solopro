import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/" style={{ textDecoration: 'none' }}>
          SOLOPRO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/" style={{ textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin" style={{ textDecoration: 'none' }}>
                Admin
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link text-white"
                style={{ textDecoration: 'none' }}
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item btn btn-link" style={{ textDecoration: 'none' }}>
                    Action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item btn btn-link" style={{ textDecoration: 'none' }}>
                    Another action
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item btn btn-link" style={{ textDecoration: 'none' }}>
                    Something else here
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled text-white" aria-disabled="true">
                Disabled
              </span>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
