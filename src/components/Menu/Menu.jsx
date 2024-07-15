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
    return (

        <div className={styles.container}>
            <ul>
                <li><a href="#">Shop</a></li>
                <li><Link to="/library">Library</Link></li>
                <li><a href="#">Card</a></li>
                <Link to="/"><img src="/img/poke.png" className={styles.menuimg} /></Link>
                <li><a href="#">Search</a></li>
                {isLoggedIn ? (
                    <li><Link to="/mypage">MyPage</Link></li>
                ) : (
                    <li><Link to="/login">Mypage</Link></li>
                )}
                {isLoggedIn ? (
                    <li><a href="#" onClick={logout}>Logout</a></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </div>
        
    )
}