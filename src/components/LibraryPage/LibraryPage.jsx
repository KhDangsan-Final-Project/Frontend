import styles from './css/LibraryPage.module.css';
import Encyclopedia from './LibraryContent/Encyclopedia';

export default function LibraryPage() {
    return (
        <div className={styles.background}>
            <Encyclopedia />
        </div>
    )
}