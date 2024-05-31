import './App.css';
import Scene from '../scene/Scene';
import Calendar from '../calendar/Calendar';
import Nav from '../nav/Nav';
import Form from '../form/Form';
import { getHabits } from '../apiCalls';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import flower1 from '../images/flowers/flowerID_1.png';

function App() {
  const [error, setError] = useState()
  const [userHabits, setHabits] = useState([])
  const [userId, setUserId] = useState(1)
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function loadForm(e) {
    e.preventDefault();
    if (!isActive) {
      setIsActive(true);
    }
  }

  function closeForm(e) {
    e.preventDefault();
    setIsActive(false);
  }

  useEffect(() => {
    showUser(userId)
    
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  const showUser = async (userId) => {
    try {
      const habits = await getHabits(userId)
      if (habits) {
        setHabits(habits.data)
      }
    } catch (error) {
      setError(error)
    }
    // **** removed this line below once fetch is implemented
    // setHabits(habits)
  }
  
  return (
    <>
      <Nav loadForm={loadForm} />
      <Routes>
        <Route path='/' element={<Scene habits={userHabits} setError={setError} />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      { isActive && <Form isActive={isActive} closeForm={closeForm}/> }
      { error && <h2 className="fetch-error">{error.message}</h2> }
    </>
  );
}

export default App;