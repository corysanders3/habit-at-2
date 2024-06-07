import './App.css';
import Scene from '../scene/Scene';
import Calendar from '../calendar/Calendar';
import Nav from '../nav/Nav';
import Form from '../form/Form';
import NotFound from '../notFound/NotFound';
import { getHabits } from '../apiCalls';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import FlowerDetails from '../flowerdetails/FlowerDetails';
import Question from '../question/Question';

function App() {
  const [error, setError] = useState();
  const [userHabits, setHabits] = useState([]);
  const [userId, setUserId] = useState(1);
  const [formActive, setFormActive] = useState(false);
  const [questionActive, setQuestionActive] = useState(false);
  const [details, showDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function loadForm(e, active, setActive) {
    e.preventDefault();
    if (!active) {
      setActive(true);
    }
  }

  function closeForm(e, setActive) {
    if(e) {
      e.preventDefault();
      setActive(false);
    } else {
      setActive(false);
    }
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
  }

  const getDetails = (habit) => {
    if (habit) {
      showDetails(habit)
    } else {
      showDetails(false)
      closeForm(undefined, setQuestionActive)
    }
  }

  return (
    <>
      <Nav loadForm={loadForm} getDetails={getDetails} formActive={formActive} setFormActive={setFormActive}/>
      <Routes>
        <Route path='/' element={<Scene habits={userHabits} setError={setError} getDetails={getDetails} />} />
        <Route path="/calendar" element={<Calendar userId={userId} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {formActive && <Form setFormActive={setFormActive} closeForm={closeForm} showUser={showUser} userId={userId}/>}
      {error && <h2 className="fetch-error">{error.message}</h2>}
      {details && <FlowerDetails details={details} getDetails={getDetails} loadForm={loadForm} questionActive={questionActive} setQuestionActive={setQuestionActive}/>}
      {questionActive && <Question details={details} setQuestionActive={setQuestionActive} closeForm={closeForm} userId={userId}/>}
    </>
  );
}

export default App;