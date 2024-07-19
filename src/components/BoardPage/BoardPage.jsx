import React, { useState } from 'react';
import BoardMain from './BoardMain/BoardMain';
import styles from './css/BoardPage.module.css';
import BoardWrite from './BoardContent/BoardWrite';

export default function BoardPage() {
    const [active, setActive] = useState('main');

    const showWrite = () => {
        setActive('write')
    };

    const showBoard = () => {
        setActive('main');
    };


    return (
        <div className={styles.container}>
            {active === 'main' && <BoardMain showWrite={showWrite}/>}
            {active === 'write' && <BoardWrite showBoard={showBoard} />}
        </div>

    );
}
