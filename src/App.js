import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import Sidebar from './components/Menu/Sidebar/Sidebar';
import Shop from './components/Menu/Pages/Shop';
import Library from './components/Menu/Pages/Library';
import Card from './components/Menu/Pages/Card';
import Search from './components/Menu/Pages/Search';
import News from './components/Menu/Pages/News';
import MyPage from './components/Menu/Pages/MyPage';
import Menu from './components/Menu/Menu';
import Footer from './components/Menu/Footer/Footer';


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
        <Route path='/Sidebar' element={<Sidebar />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/News" element={<News />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
