import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div>
        <h1>독거노인 모니터링 시스템</h1>
        <nav>
          <Link to="/">홈</Link> | <Link to="/dashboard">대시보드</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>홈 페이지</h2>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
