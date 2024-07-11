import React, { useState } from 'react';
import Login from "./Login/Login";
import styles from "./css/LoginPage.module.css"

export default function LoginPage() {
    const [token, setToken] = useState(null);

    return(
        <div className={styles.container}>
            <Login setToken={setToken} />
        </div>
    )
}