import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePokemonCards from './hook/usePokemonCards';
import usePokemonDetails from './hook/usePokemonDetails';
import styles from './css/Encyclopedia.module.css';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';

const fetchPokemonIdByName = async (name) => {
    try {
        const response = await axios.get(`https://teeput.synology.me:30112/ms2/pokemon/search?koreanName=${name}`);
        if (response.data.length > 0) {
            console.log(response.data[0].id);
            return response.data[0].id;
        } else {
            console.log('No Pokémon found with that name.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Pokémon ID by name:', error);
        throw error;
    }
};

export default function Encyclopedia() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedType, setSelectedType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [pokemonId, setPokemonId] = useState(null);
    const { pokemonCards, loading: cardsLoading, totalPages } = usePokemonCards(currentPage, selectedType, pokemonId);
    const { pokemonDetails, loading: detailsLoading } = usePokemonDetails(pokemonCards);

    useEffect(() => {
        if (searchQuery) {
            setSearchTerm(searchQuery);
            fetchPokemonIdByName(searchQuery).then(setPokemonId).catch(console.error);
        }
    }, [searchQuery]);

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    const handleTypeChange = (type) => {
        setSelectedType(type);
        setSearchTerm('');
        setCurrentPage(1); // 타입 변경 시 페이지를 초기화합니다.
        setPokemonId(null); // 타입 변경 시 검색어 초기화
    };
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
        setSelectedType('');
        setCurrentPage(1);

        try {
            const id = await fetchPokemonIdByName(searchInput);
            setPokemonId(id);
        } catch (error) {
            console.error('Error fetching Pokémon by name:', error);
        }
    };

    const isLoading = cardsLoading || detailsLoading;

    return (
        <div className={styles.encyclopedia}>
            <div className={styles.none}></div>
            <h1 className={styles.title}>CARD LIBRARY</h1>
            <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="포켓몬을 검색하세요!"
                    value={searchInput}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    <FontAwesomeIcon icon={faSearch} className={styles.search_i}/>
                </button>
            </form>
            <div className={styles.typeContainer}>
                <button onClick={() => handleTypeChange('')} className={styles.typeButton}></button>
                <button onClick={() => handleTypeChange('Colorless')} className={styles.typeColorless}></button>
                <button onClick={() => handleTypeChange('Grass')} className={styles.typeGrass}></button>
                <button onClick={() => handleTypeChange('Fire')} className={styles.typeFire}></button>
                <button onClick={() => handleTypeChange('Water')} className={styles.typeWater}></button>
                <button onClick={() => handleTypeChange('Lightning')} className={styles.typeLightning}></button>
                <button onClick={() => handleTypeChange('Psychic')} className={styles.typePsychic}></button>
                <button onClick={() => handleTypeChange('Fighting')} className={styles.typeFighting}></button>
                <button onClick={() => handleTypeChange('Darkness')} className={styles.typeDarkness}></button>
                <button onClick={() => handleTypeChange('Metal')} className={styles.typeMetal}></button>
                <button onClick={() => handleTypeChange('Fairy')} className={styles.typeFairy}></button>
                <button onClick={() => handleTypeChange('Dragon')} className={styles.typeDragon}></button>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.cardContainer}>
                    {pokemonCards.map((card) => {
                        const detail = pokemonDetails[card.id] || {};
                        return (
                            <Card
                                key={card.id}
                                image={card.images.large}
                                name={detail.name}
                                type={detail.types}
                                abilities={detail.abilities}
                            />
                        );
                    })}
                </div>
            )}
            <div className={styles.pagination}>
                {!pokemonId && (
                    <>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.btn}>이전</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.btn}>다음</button>
                    </>
                )}
            </div>
        </div>
    );
}
