import styles from './css/Menu.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Menu({ token, logout }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    useEffect(() => {
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [token]);


    const alertMsg = () =>{
        alert("로그인 후 이용해주시기 바랍니다.");
      };
    return (

        <div className={styles.container}>
            <ul>
                <li><Link to="/library">라이브러리</Link></li>
                <li><Link to="/fight" target="_blank" rel="noopener noreferrer">게임</Link></li>
                <li><a href="#">AI카드</a></li>
                <Link to="/"><img src="/img/poke.png" className={styles.menuimg} /></Link>
                <li><Link to="search">커뮤니티</Link></li>
                {isLoggedIn ? (
                    <li><Link to="/mypage">마이페이지</Link></li>
                ) : (
                    <li><Link to="/login" onClick={alertMsg}>마이페이지</Link></li>
                )}
                {isLoggedIn ? (
                    <li><a href="#" onClick={logout}>로그아웃</a></li>
                ) : (
                    <li><Link to="/login">로그인</Link></li>
                )}
            </ul>
        </div>
        
    )
}