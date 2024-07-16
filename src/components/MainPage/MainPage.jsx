import React from 'react';
import SliderText from "./contents/SliderText";
import styles from './css/MainPage.module.css';
import FooterImg from '../Menu/Footer/FooterImg';
import Footer from '../Menu/Footer/Footer';

export default function MainPage({ setToken }) {

  return (
    <div className={styles.background}>
        <>
          <SliderText/>
          <section className={styles.section}></section>
          <FooterImg />
          <Footer />
        </>
    </div>
  );
}
