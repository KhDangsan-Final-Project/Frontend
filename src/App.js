// App.js (또는 라우터를 설정하는 파일)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Battle from './components/fightpage/contents/Battle';
import FightContent from './components/fightpage/contents/FightContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FightContent />} />
        <Route path="/battle" element={<Battle/>} />
      </Routes>
    </Router>
  );
}

export default App;
