import React from 'react';
import BoardMain from './BoardMain/BoardMain';
import styles from './css/BoardPage.module.css'

export default function BoardPage() {

    return (
        <>
        <div className={styles.container}>
            <BoardMain/>
            </div>
        </>
    );
}
