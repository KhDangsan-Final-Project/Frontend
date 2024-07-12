import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import Sidebar from './components/SidebarPage/Sidebar';
import Menu from './components/SidebarPage/Pages/Menu';
import Library from './components/SidebarPage/Pages/Library';
import Card from './components/SidebarPage/Pages/Card';
import Search from './components/SidebarPage/Pages/Search';
import News from './components/SidebarPage/Pages/News';
import MyPage from './components/SidebarPage/Pages/MyPage';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path='/Sidebar' element={<Sidebar />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/News" element={<News />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
