import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useVisitorCount, useDisplayedCount } from './contents/hook/useVisitorData';
import SliderText from "./contents/SliderText";
import styles from './css/Main.module.css';
import PlayBattle from './contents/PlayBattle';
import Footer from '../Menu/Footer/Footer';
import FooterImg from '../Menu/Footer/FooterImg';
import ViewText from './contents/ViewText';
import View from './contents/View';
import Line from './contents/Line';
import RankCarousel from './contents/RankCarousel';
import ContentInfo from './contents/ContentInfo';
import Loading from '../Loading/Loading';
import usePokemonData from './contents/hook/usePokemonData';
import useRankData from './contents/hook/useRankData';
import PlayLibrary from './contents/PlayLibrary';
import PlayAI from './contents/PlayAI';

export default function MainPage({ setToken }) {
  const { pokemonData, loading: pokemonLoading } = usePokemonData(20);
  const ranks = useRankData();
  const [loading, setLoading] = useState(true);
  const [additionalLoading, setAdditionalLoading] = useState(true);

  const { visitorCount, error: visitorError } = useVisitorCount(setLoading);
  const displayedCount = useDisplayedCount(visitorCount, loading);

  const [viewTextRef, viewTextInView] = useInView({ triggerOnce: true });
  const [ContentInfoRef, ContentInfoView] = useInView({ triggerOnce: true });
  const [RankCarouselRef, RankCarouselView] = useInView({ triggerOnce: true });
  const [LineRef, LineView] = useInView({ triggerOnce: true });
  const [playBattleRef, playBattleInView] = useInView({ triggerOnce: true });
  const [playLibraryRef, playLibraryInView] = useInView({ triggerOnce: true });
  const [playAIRef, playAIInView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setAdditionalLoading(false);
      }, 10);
    }
  }, [loading]);

  if (pokemonLoading || ranks.length === 0 || loading || additionalLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.background}>
      <SliderText pokemonData={pokemonData} />
      {!visitorError && (
        <div className={styles['hide-on-small-screen']}>
          <section ref={viewTextRef} className={`${styles.section1} ${viewTextInView ? styles['slide-in'] : ''}`}>
            <ViewText visitorCount={visitorCount} displayedCount={displayedCount} />
            <View />
          </section>
        </div>
      )}
      <div className={styles.jump} />
      <section ref={ContentInfoRef} className={`${styles.section3} ${ContentInfoView ? styles['slide-in'] : ''}`}>
        <ContentInfo />
      </section>
      <div className={styles.jump} />
      <section ref={RankCarouselRef} className={`${styles.section2} ${RankCarouselView ? styles['slide-in'] : ''}`}>
        <RankCarousel />
      </section>
      <div className={styles.jump} />
      <section ref={LineRef} className={`${styles.section3} ${LineView ? styles['slide-in'] : ''}`}>
        <Line />
      </section>
      <div className={styles.jump} />
      <div className={styles.jump} />
      <section ref={playBattleRef} className={`${styles.section1} ${playBattleInView ? styles['slide-in'] : ''}`}>
        <PlayBattle />
      </section>
      <div className={styles.jump} />
      <div className={styles.jump} />
      <section ref={playLibraryRef} className={`${styles.section2} ${playLibraryInView ? styles['slide-in'] : ''}`}>
        <PlayLibrary />
      </section>
      <div className={styles.jump} />
      <div className={styles.jump} />
      <section ref={playAIRef} className={`${styles.section1} ${playAIInView ? styles['slide-in'] : ''}`}>
        <PlayAI />
      </section>
      <div className={styles.jump} />
      <div className={styles.jump} />
      <FooterImg />
      <Footer />
    </div>
  );
}
