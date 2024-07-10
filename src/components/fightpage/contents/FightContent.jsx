import { useState } from 'react';
import styles from './fight.module.css';

export default function FightContent() {
    const [item, setItem] = useState(false);
    const [fight, setFight] = useState(false);
    const [pokemonList, setPokemonList] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [hp, setHp] = useState(100); // 포켓몬 HP 상태 추가

    // const pokemonImages = {
    //     pokemon1: '/public/img/pokemon1.png',
    //     pokemon2: '/public/img/pokemon2.png',
    //     pokemon3: '/public/img/pokemon3.png',
    //     pokemon4: '/public/img/pokemon4.png',
    //     pokemon5: '/public/img/pokemon5.png',

    // };

    const fightBtn = () => {
        setFight(true);
        setItem(false);
        setPokemonList(false);
    };

    const itemBtn = () => {
        setItem(true);
        setFight(false);
        setPokemonList(false);
    };

    const runBtn = () => {
        alert("you can't run!");
    };

    const showPokemonList = () => {
        setPokemonList(true);
        setFight(false);
        setItem(false);
    };

    const pokemonCardList = (pokemonId) => {
        setSelectedPokemon(pokemonId);
        window.confirm(`${pokemonId}를 선택하시겠습니까?`);
    };

    const itemCardList = (itemId) => {
        setSelectedItem(itemId);
        window.confirm(`${itemId}를 선택하시겠습니까?`);
    };

    const handleAttack = () => {
        setHp((prevHp) => Math.max(0, prevHp - 20)); // HP를 20 줄이고 0 아래로 내려가지 않게 설정
    };

    const getHpColor = (hp) => {
        if (hp > 60) return '#4CAF50'; // Green
        if (hp > 30) return '#FFEB3B'; // Yellow
        return '#F44336'; // Red
    };

    return (
        <html>

        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.myPokemonInfo}>
                    <div className={styles.pokemonCardAttackMethod}>

                    <div className={styles.pokemonCardImage}>
                        {selectedPokemon && <img className={styles.pokemon1}></img>}
                    </div>
                    <div className={styles.pokemonCardInfo}>
                        <div className={styles.pokemonAttack}>
                        <div className={styles.waterImage}></div>
                         <p>Shinobi Blade 170</p>
                        </div>
                        <div className={styles.pokemonAttack}>
                        <div className={styles.waterImage}></div>
                        <div className={styles.colorlessImage}></div>
                        <div className={styles.colorlessImage}></div>
                         <p>Mirage Barrage</p>
                        </div>
                    </div>
                    </div>
                    <ul>
                        <li className={styles.pokemonName}>my pokemon name</li>
                        <li className={styles.hp}>HP</li>
                        <input 
                            type='range' 
                            value={hp} 
                            readOnly 
                            style={{ background: getHpColor(hp) }} 
                            alt='포켓몬 HP 박스'
                        ></input> {/* HP 상태를 input range에 반영 */}
                    </ul>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.vs} ></div>
            </div>
            <div className={styles.foot}>
                <div className={styles.enemyPokemonInfo}>
                    <div className={styles.pokemonCardImage}></div>
                    <div className={styles.pokemonCardInfo}>
                        <div className={styles.pokemonAttack}>
                        <div className={styles.grassImage}></div>
                    <p>Bug Bite 20</p>
                        </div>
                    </div>
                    <ul>
                        <li className={styles.pokemonName}>enemy pokemon name</li>
                        <li className={styles.hp}>HP</li>
                        <input type='range' alt='포켓몬 HP 박스'></input>
                    </ul>
                </div>
            </div>
            <div className={styles.gamebox}>
                <div className={styles.bottomMenu}>
                    <p>What will Spinarak do?</p>
                    <div className={styles.Menu}>
                        <button onClick={fightBtn}>FIGHT</button>
                        <button onClick={showPokemonList}>POKeMON</button>
                        <button onClick={itemBtn}>ITEM</button>
                        <button onClick={runBtn}>RUN</button>
                    </div>
                </div>
                {fight && (
                    <div className={styles.attackMethod}>
                        <button onClick={handleAttack}>Attack example1</button>
                        <button onClick={handleAttack}>Attack example2</button>
                        <button onClick={handleAttack}>Attack example3</button>
                        <button onClick={handleAttack}>Attack example4</button>
                    </div>
                )}
                {item && (
                    <div className={styles.ItemCardList}>
                        <a href="#item1" onClick={() => itemCardList('item1')}> <div className={styles.item1}></div></a><br/>
                        <a href="#item2" onClick={() => itemCardList('item2')}><div className={styles.item2}></div></a><br/>
                        <a href="#item3" onClick={() => itemCardList('item3')}> <div className={styles.item3}></div></a><br/>
                        <a href="#item4" onClick={() => itemCardList('item4')}> <div className={styles.item4}></div></a><br/>
                        <a href="#item5" onClick={() => itemCardList('item5')}> <div className={styles.item5}></div></a>
                    </div>
                )}
                {pokemonList && (
                    <div className={styles.PokemonList}>
                        <a href="#pokemon1" onClick={() => pokemonCardList('pokemon1')}> <div className={styles.pokemon1}></div></a><br/>
                        <a href="#pokemon2" onClick={() => pokemonCardList('pokemon2')}> <div className={styles.pokemon2}></div></a><br/>
                        <a href="#pokemon3" onClick={() => pokemonCardList('pokemon3')}> <div className={styles.pokemon3}></div></a><br/>
                        <a href="#pokemon4" onClick={() => pokemonCardList('pokemon4')}> <div className={styles.pokemon4}></div></a><br/>
                        <a href="#pokemon5" onClick={() => pokemonCardList('pokemon5')}> <div className={styles.pokemon5}></div></a>
                    </div>
                )}
                {selectedPokemon && (
                    <div className={styles.SelectedPokemonInfo}>
                        <p>{selectedPokemon}을(를) 선택하셨습니다.</p>
                    </div>
                )}
                {selectedItem && (
                    <div className={styles.SelectedItemInfo}>
                        <p>{selectedItem}을(를) 선택하셨습니다.</p>
                    </div>
                )}
            </div>
        </div>
        <div>

        <h1>전투 규칙 과 그외 내용</h1><br/>
        <p>아이템 카드 5개 선택, 포켓몬 카드 5개 선택, 본인 턴일때 run 버튼 실행 가능</p><br/>
                <p>처음 스타팅 카드를 고를때 카드 하나에 120HP 이상 금지, 카드는 3개까지 선택 가능, 스타팅 카드의 최대 합 HP는 310HP</p><br/>
                <p>npm i react-jss / npm i react-router-dom</p>
                <h2>기능 구현</h2>
                <p>HP 슬라이드 버튼 삭제</p><br/>
                <p>HP 데이터 변경 시 사라진 HP 는 회색으로 데이터 처리</p><br/>
                <p>포켓몬/아이템 카드 데이터 받는 테스트</p><br/>
                <p>포켓몬 카드에 있는 공격 리스트 받는 테스트</p><br/>

        </div>
                </html>
    );
}
