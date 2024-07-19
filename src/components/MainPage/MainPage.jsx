import React, { useState, useEffect } from 'react';
import SliderText from "./contents/SliderText";
import styles from './css/MainPage.module.css';
import usePokemonData from './contents/hook/usePokemonData';
import Loading from '../Loading/Loding';

export default function MainPage({ setToken}) {
  const count = 20;
  const maxId = 151;
  const { pokemonData, loading } = usePokemonData(count, maxId);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      const grantNo = tokenData.grantNo;
      if (grantNo === 0) {
        setShowPopup(true);
      }
    }
  }, [setToken]);

  const closePopup = () => {
    setShowPopup(false);
  };
  
  return (
    <div className={styles.background}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SliderText pokemonData={pokemonData} />
          <section className={styles.section}></section>
          {showPopup && (
            <div className={styles.popup}>
              <button onClick={closePopup} className={styles.closeButton}>닫기</button>
              <a href='http://localhost:9996/ms4/user/list' target='_blank' rel='noopener noreferrer'>유저 목록 바로보기</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
