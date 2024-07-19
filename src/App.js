import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Battle from './components/fightpage/contents/Battle';
import FightContent from './components/fightpage/contents/FightContent';
import Encyclopedia from './components/encyclopediapage/contents/EncyclopediaContent';
import Chat from './components/fightpage/contents/Chat';import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Menu from './components/Menu/Menu';
import Sidebar from './components/Menu/Sidebar/Sidebar';
import MyPage from './components/MyPage/MyPage';
import SettingFightContent from './components/fightpage/contents/SettingFightContent';

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
        <Route path="/" element={<MainPage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/library" element={<LibraryPage setToken={setToken} />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/fight" element={<FightContent token={token}/>} />
        <Route path="/battle" element={<Battle token={token}/>} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/chat" element={<Chat token={token}/>}/>
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
