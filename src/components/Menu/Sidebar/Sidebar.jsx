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
            <li><Link to="/mypage" onClick={handLinkClick}>내 정보</Link></li>
          ) : (
            <li><Link to="/login" onClick={handLinkClick}>내 정보</Link></li>
          )}

          <li>
            <Link to={"/Library"} className="nav-menu-list" onClick={handLinkClick}>
              라이브러리
            </Link>
          </li>
          <li>
            <Link to={"/Card"} className="nav-menu-list" onClick={handLinkClick}>
              카드
            </Link>
          </li>
          <li>
            <Link to={"/Search"} className="nav-menu-list" onClick={handLinkClick}>
              검색
            </Link>
          </li>
          <li>
            <Link to={"/boardMain"} className="nav-menu-list" onClick={handLinkClick}>
              게시판
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};
