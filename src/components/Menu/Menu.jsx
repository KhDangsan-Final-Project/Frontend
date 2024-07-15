import { Link } from 'react-router-dom';
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
                <li><Link to='/library'>Library</Link></li>
                <li><a href="#">Card</a></li>
                <Link to='/'><img src="/img/poke.png" className={styles.menuimg} /></Link>
                <li><a href="#">Search</a></li>
                <li><a href="#">News</a></li>
                {isLoggedIn ? (
                    <li><Link to='#'>MyPage</Link></li>
                ) : (
                    <li><Link to='/Login'>Login</Link></li>
                )}
            </ul>
            
        </div>
    )
}