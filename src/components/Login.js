import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/ms3/user/select', { id, password });
      if (response.data.result) {
        setMessage('로그인 성공');
        // 토큰을 로컬 스토리지에 저장하거나 다른 작업을 수행할 수 있습니다.
        localStorage.setItem('token', response.data.token);
      } else {
        setMessage('로그인 실패: ' + response.data.msg);
      }
    } catch (error) {
      setMessage('로그인 중 오류 발생');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin}>
        <div>
          <label>
            ID:
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
