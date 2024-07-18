import React from 'react';
import styles from './css/ContentInfo.module.css';

const features = [
    {
        title: "다양한 카드 종류",
        description: "포켓 카드에는 다양한 종류의 카드가 포함되어 있어, 각 카드마다 고유한 능력과 특성을 가지고 있습니다.",
        img: "/img/info/1.jpg",
      },
      {
        title: "수집 및 진화",
        description: "카드를 수집하고 업그레이드하여 강력한 카드로 진화시킬 수 있습니다. 다양한 진화 경로를 탐험해보세요.",
        img: "/img/info/2.jpg",
      },
      {
        title: "전략적 배틀",
        description: "포켓 카드 배틀에서는 전략이 중요합니다. 각 카드의 능력을 잘 활용하여 상대를 제압하세요.",
        img: "/img/info/3.jpg",
      },
      {
        title: "커뮤니티 기능",
        description: "다른 플레이어들과 소통하고, 카드 교환 및 배틀을 통해 커뮤니티를 형성할 수 있습니다.",
        img: "/img/info/4.jpg",
      },
      {
        title: "이벤트 및 챌린지",
        description: "정기적인 이벤트와 챌린지를 통해 특별한 보상을 받을 수 있습니다. 매일 새로운 도전을 즐기세요.",
        img: "/img/info/5.jpg",
      },
      {
        title: "시각적 효과",
        description: "포켓 카드는 화려한 시각적 효과와 애니메이션을 통해 게임의 몰입감을 높여줍니다.",
        img: "/img/info/6.jpg",
      },
    ];

export default function ContentInfo() {
    return (
        <div className={styles.container}>
            <div className={styles.features}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                            <img src={feature.img} alt={feature.title} className={styles.featureImg} />
                        <div className={styles.featureItemIndex}>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
