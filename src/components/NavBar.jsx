import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <header className="navBar">
      <div className='navbar-title-container'>
        <img src="/logo_SYMBIOTIK.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">Adaptation Panel</h1>
      </div>
      <FontAwesomeIcon icon={faUser} className="navbar-profile-icon" />
    </header>
  );
};

export default NavBar;
