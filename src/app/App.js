import './App.css';
import Scene from '../scene/Scene';
import Calendar from '../calendar/Calendar';
import Nav from '../nav/Nav';
import Form from '../form/Form';
import { getHabits } from '../apiCalls';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import FlowerDetails from '../flowerdetails/FlowerDetails';

function App() {
  const [error, setError] = useState()
  const [userHabits, setHabits] = useState([])
  const [userId, setUserId] = useState(1)
  const [isActive, setIsActive] = useState(false);
  const [details, showDetails] = useState(false)

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

  const getDetails = (habit) => {
    if (habit) {
      showDetails(habit)
    } else {
      showDetails(false)
    }
  }

  return (
    <>
      <Nav loadForm={loadForm} getDetails={getDetails}/>
      <Routes>
        <Route path='/' element={<Scene habits={userHabits} setError={setError} getDetails={getDetails} />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      {isActive && <Form isActive={isActive} closeForm={closeForm} showUser={showUser} userId={userId} />}
      {error && <h2 className="fetch-error">{error.message}</h2>}
      {details && <FlowerDetails details={details} getDetails={getDetails} />}
    </>
  );
}

export default App;