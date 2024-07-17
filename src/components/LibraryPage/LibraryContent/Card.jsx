import React from 'react';
import styles from './css/Card.module.css';

export default function Card({ image, name, type, abilities }) {
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const overlay = card.querySelector(`.${styles.overlay}`);
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = -1 / 5 * x + 20;
        const rotateX = 4 / 30 * y - 20;

        overlay.style.backgroundPosition = `${x / 5 + y / 5}%`;
        overlay.style.filter = `opacity(${x / 200}) brightness(1.2)`;

        card.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseOut = (e) => {
        const card = e.currentTarget;
        const overlay = card.querySelector(`.${styles.overlay}`);
        
        overlay.style.filter = 'opacity(0)';
        card.style.transform = 'perspective(350px) rotateY(0deg) rotateX(0deg)';
    };

    return (
        <div className={styles.container} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
            <div className={styles.overlay}></div>
            <div className={styles.card}>
                <img src={image} alt={name} className={styles.cardImage} />
                <div className={styles.cardInfo}>
                    <div className={styles.cardName}>이름: {name}</div>
                    <div className={styles.cardType}>타입: {type}</div>
                    <div className={styles.cardAbility}>기술: {abilities}</div>
                </div>
            </div>
        </div>
    );
}
