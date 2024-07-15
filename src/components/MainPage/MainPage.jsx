import React from 'react';
import SliderText from "./contents/SliderText";
import styles from './css/MainPage.module.css';
import usePokemonData from './contents/hook/usePokemonData';
import Loading from '../Loading/Loding';
import PokemonCardSlider from './contents/PokemonCardSlider';
import PlayBattle from './contents/PlayBattle';

export default function MainPage({ setToken }) {
  const count = 20;
  const maxId = 151;
  const { pokemonData, loading } = usePokemonData(count, maxId);

  return (
    <div className={styles.background}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SliderText pokemonData={pokemonData} />
          <section className={styles.section}></section>
            <PokemonCardSlider/>
          <section className={styles.section}></section>
            <PlayBattle/>
        </>
      )}
    </div>
  );
}
