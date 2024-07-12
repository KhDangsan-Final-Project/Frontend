import Menu from "../MenuPage/Menu";
import React, { useState } from 'react';

export default function MainPage() {
    const [token, setToken] = useState(null);

    return (
        <>
        <Menu setToken={setToken} />
        </>
    )
}