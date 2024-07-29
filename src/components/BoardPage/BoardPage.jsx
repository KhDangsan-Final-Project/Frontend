import React, { useState } from 'react';
import BoardMain from './BoardMain/BoardMain';
import styles from './css/BoardPage.module.css';
import BoardWrite from './BoardContent/BoardWrite';
import FooterImg from '../Menu/Footer/FooterImg';
import Footer from '../Menu/Footer/Footer';
export default function BoardPage( { setToken, token } ) {
    const [active, setActive] = useState('main');
    

    const showWrite = () => {
        setActive('write')
    };

    const showBoard = () => {
        setActive('main');
    };
    
   
    return (
        <div className={styles.container}>
        <div className={styles.jump} />
            {active === 'main' && <BoardMain showWrite={showWrite} token={token} setToken={setToken} />}
            {active === 'write' && <BoardWrite showBoard={showBoard} />}
            
        <div className={styles.jump}></div>
        <FooterImg/>
        <Footer/>
        </div>
    );
}
