import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import Nav from './nav/Nav';
import Calendar from './calendar/Calendar';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Nav />
      <Routes>
        <Route index element={<App />}/>
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
