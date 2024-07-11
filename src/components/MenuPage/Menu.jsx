import { Link } from 'react-router-dom';
import styles from './css/Menu.module.css';

export default function Menu() {
    return (
    
        <div className={styles.container}>
            <ul>
                <li><Link to="#">Menu</Link></li>
                <li><Link to="#">Library</Link></li>
                <li><Link to="#">Card</Link></li>
                <li><Link to="#"><img src="/img/poke.png" className={styles.menuimg}/></Link></li>
                <li><Link to="#">Search</Link></li>
                <li><Link to="#">News</Link></li>
                <li><Link to="#">MyPage</Link></li>
            </ul>
        </div>
    )
    }