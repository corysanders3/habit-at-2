import React from 'react';
import "./Nav.css";
import Logo from "../assets/logo192.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Form from '../form/Form';

function Nav() {
  const [isActive, setIsActive] = useState(false);

  function loadForm(e) {
    e.preventDefault()
    if(!isActive) {
      setIsActive(true)
    } 
  }

  function closeForm(e) {
    e.preventDefault()
    setIsActive(false)
  }

  return (
    <>
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
          <button className='form-btn' onClick={e => loadForm(e)}>New Habit</button>
      </nav>
      <Form isActive={isActive} closeForm={closeForm}/>
    </>
  )
}

export default Nav

