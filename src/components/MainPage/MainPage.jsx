import React from 'react';
import SliderText from "./contents/SliderText";
import styles from './css/MainPage.module.css';

export default function MainPage({ setToken }) {

  return (
    <div className={styles.background}>
        <>
          <SliderText/>
          <section className={styles.section}></section>
        </>
    </div>
  );
}
