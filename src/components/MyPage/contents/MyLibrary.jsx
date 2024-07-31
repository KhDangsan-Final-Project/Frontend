import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/MyLibrary.module.css';
import usePokemonDetails from './hook/usePokemonDetails'; 
import { useNavigate } from 'react-router-dom';

export default function MyLibrary() {
  const [pokemonLibrary, setPokemonLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 


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
      const response = await axios.get('https://teeput.synology.me:30112/ms3/library', {
        params: { token },
      });
      if (response.data.status === 'success') {
        setPokemonLibrary(response.data.lib);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('포켓몬 데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResultClick = (name) => {
    navigate(`/library?search=${name}`); // 해당 이름으로 검색 페이지로 이동
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
          <div key={index} className={styles.card} onClick={() => handleResultClick(pokemonDetails[pokemon.pokemonNum].name)}>
              <div className={styles.cardInfo}>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemonNum}.png`} 
                  className={styles.pokemonImage} />
                <div className={styles.cardtext}>
                  <div className={styles.cardName}>이름: {pokemonDetails[pokemon.pokemonNum].name}</div>
                  <div className={styles.cardDetails}>타입: {pokemonDetails[pokemon.pokemonNum].types}</div>
                  <div className={styles.cardDetails}>기술: {pokemonDetails[pokemon.pokemonNum].abilities}</div>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
