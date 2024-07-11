import Login from "./Login/Login";
import styles from "./css/LoginPage.module.css"

export default function LoginPage() {
    return(
        <div className={styles.container}>
            <Login />
        </div>
    )
}