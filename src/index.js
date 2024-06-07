import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Suspense fallback={<div>Loading... </div>}>
        <App />
      </Suspense>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
