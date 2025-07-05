
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import logo from '../../assets/logo.svg'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

function Navbar({ username = 'User', onLogout }) {
  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo + Brand */}
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span></span>
        </Link>

        {/* Hello + Logout */}
        <div className="navbar-username-group">
          <span className="navbar-username">Hello, {username}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
