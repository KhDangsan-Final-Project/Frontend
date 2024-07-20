import styles from './css/Scroll.module.css';
import React, { useState, useEffect } from 'react';

export default function Scroll() {
    const [isVisible, setIsVisble] = useState(false);

    const toggleVisibility = () => {
        if(window.scrollY > 300){
            setIsVisble(true);
        } else {
            setIsVisble(false);
        }
    };

    useEffect(() =>{
        window.addEventListener('scroll', toggleVisibility);
        return() =>{
            window.removeEventListener('scroll', toggleVisibility);
        };
    },[]);

    function scrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return(
        <div onClick={scrollToTop} className={`${styles.scrollBtn} ${isVisible ? styles.show : ''}`}>
        <img src="/img/scroll.png" className={styles.scrollImg}/>
        </div>
    )
}