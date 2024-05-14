import React from 'react';
import "./Nav.css";
import Logo from "../assets/logo192.png";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='navbar'>
        <div className='logo'>
            <img src={Logo} className='nav-icon'/>
            <h1>Habit-at</h1>
        </div>
        <Link 
        to="/"
        className='navlink'
        >
            <h2>Home</h2>
        </Link>
        <Link 
        to="/calendar"
        className='navlink'
        >
            <h2>Calendar</h2>
        </Link>
    </nav>
  )
}

export default Nav

