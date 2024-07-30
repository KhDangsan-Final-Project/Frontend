import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Menu from './components/Menu/Menu';
import Sidebar from './components/Menu/Sidebar/Sidebar';
import BoardPage from './components/BoardPage/BoardPage';
import AIPage from './components/AIPage/AIPage';
import MyPage from './components/MyPage/MyPage';
import FightContent from './components/BattlePage/contents/FightContent';
import Battle from './components/BattlePage/contents/Battle';
import Scroll from './components/Menu/Scroll/Scroll';
import PasswordResetRequestPage from './components/LoginPage/PasswdResetRequestPage/PasswordResetRequestPage';
import PasswordResetPage from './components/PasswdReset/PasswordResetPage';

// import Chat from './components/BattlePage/contents/Chat';
// import PasswordResetRequestPage from './components/PasswdReset/PasswordResetPage';

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
        <Route path="/resetPass" element={<PasswordResetRequestPage/>}/>
        <Route path="/password-reset" element={<PasswordResetPage/>} />
        {/* <Route path="/chat" element={<Chat token={token}/>}/> */}
        {/* <Route path="/password-reset-request" element={<PasswordResetRequestPage />} /> */}
      </Routes>
      <Scroll />
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