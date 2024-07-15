import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage'
import LibraryPage from './components/LibraryPage/LibraryPage';
import Menu from './components/Menu/Menu';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/Library" element={<LibraryPage setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
