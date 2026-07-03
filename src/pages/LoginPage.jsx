import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("아이디와 비밀번호를 모두 입력해주세요!");
      return;
    }

    setIsLoading(true);
    try {
      const userRef = doc(db, 'users', username.trim());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.password === password) {
          localStorage.setItem('current_user', username.trim());
          navigate('/main');
        } else {
          alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요!");
        }
      } else {
        // 회원가입
        await setDoc(userRef, {
          password: password,
          recipient: '',
          content: '',
          sender: '',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('current_user', username.trim());
        alert("처음 오셨군요! 자동으로 가입되어 로그인되었습니다 🎉");
        navigate('/main');
      }
    } catch (error) {
      console.error(error);
      alert("로그인 처리 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gate-container">
      <div className="gate-panel" style={{ maxWidth: '400px', padding: '40px' }}>
        <div className="gate-header">
          <h2>환영합니다! 👋</h2>
          <p>아이디와 비밀번호를 입력해주세요.<br/>처음 입력하시면 자동으로 가입됩니다.</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label>아이디</label>
            <input 
              type="text" 
              placeholder="예: 홍길동" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              placeholder="비밀번호 입력" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ marginTop: '16px', height: '48px', fontSize: '16px' }}
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인 및 시작하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
