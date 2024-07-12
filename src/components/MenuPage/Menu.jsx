import styles from './css/Menu.module.css';
import React, {useState, useEffect} from 'react';

export default function Menu() {
    const [isLoggedIn, SetIsLoggedIn] = useState(false);

    useEffect(() =>{
        const token = localStorage.getItem('id');
        if(token){
            SetIsLoggedIn(true);
        }
    },[]);
 
    return (

        <div className={styles.container}>
            <ul>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Library</a></li>
                <li><a href="#">Card</a></li>
                <a href="#"><img src="/img/poke.png" className={styles.menuimg} /></a>
                <li><a href="#">Search</a></li>
                <li><a href="#">News</a></li>
                {isLoggedIn ? (
                    <li><a href="#">MyPage</a></li>
                ) : (
                    <li><a href="#">Login</a></li>
                )}
            </ul>
            
        </div>
    )
}