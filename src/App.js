import Login from "./components/Login/Login";
import Card from "./components/Menu/Contents/Card";
import Library from "./components/Menu/Contents/Library";
import Menu from "./components/Menu/Contents/Menu";
import MyPage from "./components/Menu/Contents/Mypage";
import News from "./components/Menu/Contents/News";
import Search from "./components/Menu/Contents/Search";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/library" element={<Library />} />
      <Route path="/card" element={<Card />} />
      <Route path="/search" element={<Search />} />
      <Route path="/news" element={<News />} />
      <Route path="/mypage" element={<MyPage />} />

      </Routes>
      
    </Router>
  );
}

export default App;
