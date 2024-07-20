import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import LoginPage from './components/LoginPage/LoginPage';
=======
import Battle from './components/fightpage/contents/Battle';
import FightContent from './components/fightpage/contents/FightContent';
import Encyclopedia from './components/encyclopediapage/contents/EncyclopediaContent';
import Chat from './components/fightpage/contents/Chat';import LoginPage from './components/LoginPage/LoginPage';
>>>>>>> 9160dc5e13d89cec562a5c39ed4df3b94b2ace97
import MainPage from './components/MainPage/MainPage';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Menu from './components/Menu/Menu';
import Sidebar from './components/Menu/Sidebar/Sidebar';
import BoardPage from './components/BoardPage/BoardPage';
import AIPage from './components/AIPage/AIPage';
import MyPage from './components/MyPage/MyPage';
import FightContent from './components/BattlePage/contents/FightContent';
import Battle from './components/BattlePage/contents/Battle';
import PasswordResetRequestPage from './components/PasswdReset/PasswordResetPage';

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
        <Route path="/boardmain" element={<BoardPage setToken={setToken} />} />
        <Route path="/ai" element={<AIPage setToken={setToken} />} />
        <Route path="/mypage" element={<MyPage setToken={setToken} />} />
        <Route path="/fight" element={<FightContent setToken={setToken} />} />
        <Route path="/battle" element={<Battle setToken={setToken} />} />
        <Route path="/password-reset-request" element={<PasswordResetRequestPage />} />
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