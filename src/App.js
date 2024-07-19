import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Battle from './components/BattlePage/contents/Battle';
import FightContent from './components/BattlePage/contents/FightContent';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Menu from './components/Menu/Menu';
import Sidebar from './components/Menu/Sidebar/Sidebar';
import MyPage from './components/MyPage/MyPage';
import AIPage from './components/AIPage/AIPage';

function App() {
  const [token, setToken] = useState(null);
  const location = useLocation();

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

  const hideMenuAndSidebar = ['/fight', '/battle', '/encyclopedia'].includes(location.pathname);

  return (
    <>
      {!hideMenuAndSidebar && <Menu token={token} logout={logout} />}
      {!hideMenuAndSidebar && <Sidebar token={token} logout={logout} />}
      <Routes>
        <Route path="/" element={<MainPage token={token}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/library" element={<LibraryPage token={token}/>} />
        <Route path="/mypage" element={<MyPage token={token}/>} />
        <Route path="/fight" element={<FightContent token={token}/>} />
        <Route path="/battle" element={<Battle token={token}/>} />
        <Route path="/ai" element={<AIPage token={token}/>} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
