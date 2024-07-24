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
import Scroll from './components/Menu/Scroll/Scroll';
import BoardContent from './components/BoardPage/BoardContent/BoardContent';
import BoardEvent from './components/BoardPage/BoardContent/BoardEvent';
import BoardNotice from './components/BoardPage/BoardContent/BoardNotice';
import BoardList from './components/BoardPage/BoardContent/BoardList';
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
        <Route path="/boardmain" element={<BoardPage setToken={setToken} token={token}/>} />
        <Route path="/ai" element={<AIPage setToken={setToken} />} />
        <Route path="/mypage" element={<MyPage setToken={setToken} />} />
        {/* <Route path="/chat" element={<Chat token={token}/>}/> */}
        {/* <Route path="/password-reset-request" element={<PasswordResetRequestPage />} /> */}
        <Route path="/boardContent/:boardNo" element={<BoardContent/>}/>
        <Route path="/boardEvent" element={<BoardEvent/>}/>
        <Route path="/boardNotice" element={<BoardNotice/>}/>
        <Route path="/boardList" element={<BoardList/>}/>
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