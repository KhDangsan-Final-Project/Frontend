import React from 'react';
import Slider from 'react-slick';
import styles from './css/RankCarousel.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useRankData from './hook/useRankData';

const RankCarousel = () => {
  const ranks = useRankData();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {ranks.map(rank => (
          <div key={rank.id} className={styles.rankCardWrapper}>
            <div className={styles.rankCard}>
              <img src={rank.img} alt={rank.name} className={styles.image} />
              <div className={styles.rankContent}>
                <h3 className={styles.rankName}>{rank.name}</h3>
                <div className={styles.rank}>{rank.rank}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RankCarousel;
