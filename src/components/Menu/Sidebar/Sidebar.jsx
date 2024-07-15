import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Sidebar.module.css";



export default function Header (){
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <header className={styles.header}>
      <img src={isToggleOpen ? "/img/close.png" : "/img/list.png"}
          className={`${styles.menuToggleBtn} ${isToggleOpen ? styles.rotate : ''}`}
          onClick={handleToggleOpen}/>
          <ul className={`${styles.navMenu} ${isToggleOpen ? styles.open : ''}`}>
          <li>
            <Link to={"/Menu"} className="nav-menu-list">
              Menu
            </Link>
          </li>
          <li>
            <Link to={"/Library"} className="nav-menu-list">
              Library
            </Link>
          </li>
          <li>
            <Link to={"/Card"} className="nav-menu-list">
              Card
            </Link>
          </li>
          <li>
            <Link to={"/Search"} className="nav-menu-list">
              Search
            </Link>
          </li>
          <li>
            <Link to={"/News"} className="nav-menu-list">
              News
            </Link>
          </li>
          <li>
            <Link to={"/MyPage"} className="nav-menu-list">
              MyPage
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};
