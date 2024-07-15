import React from 'react';
import SliderText from "./contents/SliderText";
import styles from './css/MainPage.module.css';
import usePokemonData from './contents/hook/usePokemonData';
import Loading from '../Loading/Loding';

export default function MainPage({ setToken }) {
  const count = 20; // 원하는 포켓몬 개수
  const maxId = 151; // 원하는 포켓몬 ID 범위 (1세대)
  const { pokemonData, loading } = usePokemonData(count, maxId);

  return (
    <div className={styles.background}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SliderText pokemonData={pokemonData} />
          <section className={styles.section}></section>
        </>
      )}
    </div>
  );
}
