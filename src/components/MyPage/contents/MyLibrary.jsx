import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/MyLibrary.module.css';
import usePokemonDetails from './hook/usePokemonDetails';

export default function MyLibrary() {
  const [pokemonLibrary, setPokemonLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonData, setPokemonData] = useState({}); // 추가된 상태

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchPokemonLibrary(token);
    } else {
      setLoading(false);
      setError('로그인이 필요합니다.');
    }
  }, []);

  const fetchPokemonLibrary = async (token) => {
    try {
      const response = await axios.get('http://localhost:8090/ms3/library', {
        params: { token },
      });
      if (response.data.status === 'success') {
        setPokemonLibrary(response.data.lib);
        response.data.lib.forEach(pokemon => fetchPokemonData(pokemon.pokemonNum));
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('포켓몬 데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonData = async (pokemonNum) => {
    try {
      const apiUrl = `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${pokemonNum}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.data && response.data.data.length > 0) {
        const cardData = response.data.data[0];
        setPokemonData(prevData => ({
          ...prevData,
          [pokemonNum]: {
            name: cardData.name,
            imageUrl: cardData.images.large,
            set: cardData.set.name,
          }
        }));
      }
    } catch (error) {
      console.error("포켓몬 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const { pokemonDetails, loading: detailsLoading } = usePokemonDetails(pokemonLibrary);

  if (loading || detailsLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>내 도감</h2>
      <div className={styles.subcontainer}>
        {pokemonLibrary.map((pokemon, index) => (
          <div key={index} className={styles.card}>
            {pokemonData[pokemon.pokemonNum] ? (
              <div className={styles.cardInfo}>
                <div >
                  <img src={pokemonData[pokemon.pokemonNum].imageUrl} alt={`포켓몬 ${pokemonData[pokemon.pokemonNum].name}`} className={styles.pokemonImage}
                  />
                </div>
                <div className={styles.cardName}>
                  {pokemonDetails[pokemon.pokemonNum]?.name || pokemonData[pokemon.pokemonNum]?.name || '알 수 없음'}
                </div>
                <div className={styles.cardDetails}>
                  타입: {pokemonDetails[pokemon.pokemonNum]?.types || '알 수 없음'}
                </div>
                <div className={styles.cardDetails}>
                  기술: {pokemonDetails[pokemon.pokemonNum]?.abilities || '알 수 없음'}
                </div>
              </div>
            ) : ( <div>이미지를 가져오는 중...</div> )}
          </div>
        ))}
      </div>
    </div>
  );
}
