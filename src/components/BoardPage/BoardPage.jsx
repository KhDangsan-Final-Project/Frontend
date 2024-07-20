import React, { useState } from 'react';
import BoardMain from './BoardMain/BoardMain';
import styles from './css/BoardPage.module.css';
import BoardWrite from './BoardContent/BoardWrite';
import BoardList from './BoardContent/BoardList';
import FooterImg from '../Menu/Footer/FooterImg';
import Footer from '../Menu/Footer/Footer';

export default function BoardPage() {
    const [active, setActive] = useState('main');

    const showWrite = () => {
        setActive('write')
    };

    const showBoard = () => {
        setActive('main');
    };

    const showList = () => {
        setActive('list')
    };

    return (
        <div className={styles.container}>
            {active === 'main' && <BoardMain showWrite={showWrite} showList={showList} />}
            {active === 'write' && <BoardWrite showBoard={showBoard} />}
            {active === 'list' && <BoardList showBoard={showBoard} />}
        <div className={styles.jumpUp}></div>
        <FooterImg/>
        <Footer/>
        </div>
    );
}
