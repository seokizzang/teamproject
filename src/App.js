// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import axios from 'axios';
import React, {useState} from 'react';
import DataPage from './Data';

function App() {
  const [message, setMessage] = useState('');
  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');
  const handleMessageChange = (newMessage) =>{
    setMessage(newMessage);
  };
  const Login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://3.35.112.81:3001/login', {
        user_id: user_id,
        password: password,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('문제 발생');
    }
  };

  return (
    <Router>
      <div>
        <h1>독거노인 모니터링 시스템</h1>
        <nav>
          <Link to="/">홈</Link> | <Link to="/dashboard">대시보드</Link> | <Link to ="/Data">데이터</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>홈 페이지</h2>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Data" element={<DataPage />}/>
        </Routes>
      </div>
      <div>
        <h2>로그인</h2>
        <form onSubmit={Login}>
          <input
            type="text"
            placeholder="User_ID"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">로그인</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </Router>
  );
}

export default App;
