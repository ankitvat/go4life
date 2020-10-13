import React from 'react';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <div className="nav-control">
      <img
        alt="logo"
        className="nav-logo"
        src={logo}
      />
    </div>
  );
}

export default Navbar;
