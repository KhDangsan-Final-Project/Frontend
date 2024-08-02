import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import PasswordResetRequestPage from './components/LoginPage/PasswdReset/PasswordResetRequestPage';
import BoardContent from './components/BoardPage/BoardContent/BoardContent';
import BoardEdit from './components/BoardPage/BoardContent/BoardEdit';
import BoardEvent from './components/BoardPage/BoardContent/BoardEvent';
import BoardNotice from './components/BoardPage/BoardContent/BoardNotice';
import BoardList from './components/BoardPage/BoardList';
import FightContent from './components/BattlePage/contents/FightContent';
import Battle from './components/BattlePage/contents/Battle';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
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
    navigate('/login');
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
        <Route path="/resetPass" element={<PasswordResetRequestPage/>}/>
        <Route path="/boardContent/:boardNo" element={<BoardContent/>}/>
        <Route path="/boardEdit/:boardNo" element={<BoardEdit />} />
        <Route path="/boardEvent" element={<BoardEvent token={token} />}/>
        <Route path="/boardNotice" element={<BoardNotice token={token}/>}/>
        <Route path="/boardList" element={<BoardList token={token} />}/>
        <Route path="/fight" element={<FightContent token={token} />} />
        <Route path="/battle" element={<Battle token={token} />} />
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