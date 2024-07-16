import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import Sidebar from './components/Menu/Sidebar/Sidebar';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Menu from './components/Menu/Menu';


function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    
    <Router>
      <Menu token={token} logout={logout}/>
      <Sidebar token={token} logout={logout}/>
      <Routes>
        <Route path="/" element={<MainPage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/library" element={<LibraryPage setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
