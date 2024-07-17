import React from 'react';
import './css/View.scss';

const Scene = () => {
    return (
        <div className="container">
            <ul className="moon">
                <li className="crater"></li>
                <li className="crater"></li>
                <li className="crater"></li>
            </ul>
            <ul className="mountain-range">
                {Array.from({ length: 11 }).map((_, index) => (
                    <li key={index} className="mountain"></li>
                ))}
            </ul>
            <ul className="forest">
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="hill"></li>
                ))}
            </ul>
            <ul className="sparkles">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`one-${index}`} className="sparkle one"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`two-${index}`} className="sparkle two"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`three-${index}`} className="sparkle three"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`four-${index}`} className="sparkle four"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`five-${index}`} className="sparkle five"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`six-${index}`} className="sparkle six"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`seven-${index}`} className="sparkle seven"></li>
                ))}
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={`eight-${index}`} className="sparkle eight"></li>
                ))}
            </ul>
            <div className="grass">
                <div className="pokemon">
                    <div className="poke" id="bulbasaur">
                        <div className="ear"></div>
                        <div className="ear"></div>
                        <div className="head"></div>
                        <div className="leg"></div>
                        <div className="bulba-body"></div>
                        <div className="bulbs">
                            <div className="bulb"></div>
                        </div>
                    </div>
                    <div className="poke" id="pikachu">
                        <div className="ear"></div>
                        <div className="ear"></div>
                        <div className="hand"></div>
                        <div className="pika-body"></div>
                        <div className="head"></div>
                        <div className="pika-tail"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scene;
