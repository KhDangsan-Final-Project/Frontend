import Menu from "../MenuPage/Menu";
import React, { useState } from 'react';
import SliderText from "./contents/SliderText";

export default function MainPage() {
    const [token, setToken] = useState(null);

    return (
        <div>
            <Menu setToken={setToken} />
            <SliderText />
        </div>
    )
}