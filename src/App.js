import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/LoginPage/Register/Register';
function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/login" element={<LoginPage />} />

      </Routes>
      
    </Router>
  );
}

export default App;
