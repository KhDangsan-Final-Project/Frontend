import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import React, { useState } from 'react';
import MainPage from './components/MainPage/MainPage';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/" element={<MainPage setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
