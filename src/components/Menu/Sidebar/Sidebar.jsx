import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Sidebar.module.css";



export default function Sidebar( {token, logout} ) {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handLinkClick = () => {
    setIsToggleOpen(false);
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <>
      <header className={styles.header}>
        <img src={isToggleOpen ? "/img/close.png" : "/img/list.png"}
          className={`${styles.menuToggleBtn} ${isToggleOpen ? styles.rotate : ''}`}
          onClick={handleToggleOpen} />
        <ul className={`${styles.navMenu} ${isToggleOpen ? styles.open : ''}`}>
          {isLoggedIn ? (
            <li>
            <Link to="#" onClick={() => { handLinkClick(); logout(); }}>
                로그아웃
            </Link>
        </li>
          ) : (
            <li><Link to="/login" onClick={handLinkClick}>로그인</Link></li>
          )}
          {isLoggedIn ? (
            <li><Link to="/mypage" onClick={handLinkClick}>마이페이지</Link></li>
          ) : (
            <li><Link to="/login" onClick={handLinkClick}>마이페이지</Link></li>
          )}

          <li>
            <Link to={"/library"} className="nav-menu-list" onClick={handLinkClick}>
              라이브러리
            </Link>
          </li>
          <li>
            <Link to={"/ai"} className="nav-menu-list" onClick={handLinkClick}>
              AI카드
            </Link>
          </li>
          <li>
            <Link to={"/boardmain"} className="nav-menu-list" onClick={handLinkClick}>
              커뮤니티
            </Link>
          </li>
          <li>
            <Link to={"/game"} className="nav-menu-list" onClick={handLinkClick}>
              게임
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};
