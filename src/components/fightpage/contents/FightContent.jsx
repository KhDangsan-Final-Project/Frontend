import styles from './fight.module.css';

export default function FightContent() {

    return(
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.leave}>
<img className={styles.leaveDoor} alt='leaveDoor'></img>
<p>Leave Battle</p>
                </div>
<div className={styles.myPokemonInfo}>
<img className={styles.pokemonCardImage} alt='pokemonCardImage'></img>
    <ul>
        <li>my pokemon name</li>
        <li>HP</li>
        <li>EX , MX</li>  {/*포켓몬 카드 특성 */}
<input type='range' alt='포켓몬 HP 박스'></input>
    </ul>
</div>
            </div>
            <div className={styles.body}>
                <img className={styles.pokeLibraryImage} alt='pokeLibraryImage'></img>
<img className={styles.pokeball} alt='pokeball'></img>
<img className={styles.mainPokeball} alt='mainPokeball'></img>
<button>ATTACK</button>
            </div>
            <div className={styles.foot}>
            <div className={styles.enemyPokemonInfo}>
<img className={styles.pokemonCardImage} alt='pokemonCardImage'></img>
    <ul>
        <li>enemy pokemon name</li>
        <li>HP</li>
         <li>EX , MX</li> {/*포켓몬 카드 특성 */}
<input type='range' alt='포켓몬 HP 박스'></input>
    </ul>
</div>
            </div>
        </div>
    );
}