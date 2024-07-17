import React from 'react';
import SliderText from "./contents/SliderText";
import styles from './css/MainPage.module.css';
import PokemonCardSlider from './contents/PokemonCardSlider';
import PlayBattle from './contents/PlayBattle';
import Footer from '../Menu/Footer/Footer'
import FooterImg from '../Menu/Footer/FooterImg'
import ViewText from './contents/ViewText';
import View from './contents/View';

export default function MainPage({ setToken }) {

  return (
    <div className={styles.background}>
        <>
          <SliderText/>
          <div className={styles['hide-on-small-screen']}>
            <ViewText />
            <View />
          </div>
          <section className={styles.section}></section>
            <PokemonCardSlider/>
          <section className={styles.section}></section>
            <PlayBattle/>
          <FooterImg />
          <Footer />
        </>
    </div>
  );
}
