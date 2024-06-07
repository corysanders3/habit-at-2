import './App.css';
import Scene from '../scene/Scene';
import Calendar from '../calendar/Calendar';
import Nav from '../nav/Nav';
import Form from '../form/Form';
import Question from '../question/Question';
import { getHabits } from '../apiCalls';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
  const [error, setError] = useState()
  const [userHabits, setHabits] = useState([])
  const [userId, setUserId] = useState(1)
  const [formActive, setFormActive] = useState(false);
  const [questionActive, setQuestionActive] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  function loadForm(e) {
    e.preventDefault();
    if (!formActive) {
      setFormActive(true);
    }
  }

  function closeForm(e) {
    e.preventDefault();
    setFormActive(false);
  }

  useEffect(() => {
    showUser(userId)
    
    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 5000)
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
      { formActive && <Form closeForm={closeForm} showUser={showUser} userId={userId}/> }
      { error && <h2 className="fetch-error">{error.message}</h2> }
    </>
  );
}

export default App;