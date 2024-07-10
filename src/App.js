// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainpage/contents/MainPage';
import SubPage from './components/mainpage/contents/SubPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/pokemon/:id" element={<SubPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
