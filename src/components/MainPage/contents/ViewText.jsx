import React from 'react';
import styles from './css/ViewText.module.css';

export default function ViewText({ visitorCount, displayedCount }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>여러분들의 방문을<br /> 진심으로 환영합니다!</div>
            <div className={styles.title}>총 방문자 {displayedCount}명</div>
            <div className={styles.title}>여기서 새로운 모험을 시작하세요! <br />여러분을 기다리는 수많은 <br />포켓몬들이 있습니다. 🕵️‍♂️</div>
        </div>
    );
}
