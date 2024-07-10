import { Link } from "react-router-dom";
import styles from './css/Menu.module.css';
export default function MenuContents() {
    return(
        <div className={styles.container}>
            <ul>
                <li><Link to="menu">Menu</Link></li>
                <li><Link to="library">Library</Link></li>
                <li><Link to="card">Card</Link></li>
                <li><Link to="/"><img src="/img/poke.png" className={styles.pokeimg}/></Link></li>
                <li><Link to="search">Search</Link></li>
                <li><Link to="news">News</Link></li>
                <li><Link to="mypage">MyPage</Link></li>
            </ul>
        </div>
        
    )
}