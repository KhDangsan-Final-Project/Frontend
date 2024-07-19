import React from 'react';
import Footer from "../Menu/Footer/Footer";
import FooterImg from "../Menu/Footer/FooterImg";
import AIUpload from "./contents/AIUpload";
import styles from './css/AIPage.module.css';

export default function AIPage({ token }) {

    console.log("상위컴포넌트" + token);
  return (
    <div className={styles.background}>
      <div className={styles.jump} />
      <AIUpload token={token} />
      <div className={styles.jump} />
      <FooterImg />
      <Footer />
    </div>
  );
}
