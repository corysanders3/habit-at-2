import './App.css';
import Scene from '../scene/Scene';
import Calendar from '../calendar/Calendar';
import Nav from '../nav/Nav';
import { getHabits } from '../apiCalls';
import { Routes, Route } from 'react-router-dom';
// import habits from '../mockData/userHabits';
import React, { useState, useEffect } from 'react'

function App() {
  const [error, setError] = useState()
  const [userHabits, setHabits] = useState([])
  const [userId, setUserId] = useState(1)

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
  
  return (
    <>
      <Nav />
      <Scene habits={userHabits} setError={setError} />
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      {error && <h2 className="fetch-error">{error.message}</h2>}
    </>
  );
}

export default App;