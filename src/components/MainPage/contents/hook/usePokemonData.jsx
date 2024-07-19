import { useState, useEffect } from 'react';
import axios from 'axios';

const getRandomPokemonIds = (count, maxId) => {
  const ids = new Set();
  while (ids.size < count) {
    const id = Math.floor(Math.random() * maxId) + 1;
    ids.add(id);
  }
  return Array.from(ids);
};

const fetchTypeInKorean = async (typeUrl) => {
  const { data: typeData } = await axios.get(typeUrl);
  const koreanName = typeData.names.find(name => name.language.name === 'ko')?.name;
  return koreanName || typeData.name; // 한글명이 없으면 기본 영어명 반환
};

const fetchAbilityInKorean = async (abilityUrl) => {
  const { data: abilityData } = await axios.get(abilityUrl);
  const koreanName = abilityData.names.find(name => name.language.name === 'ko')?.name;
  return koreanName || abilityData.name; // 한글명이 없으면 기본 영어명 반환
};

const typeColors = {
  "노말": "#949495",
  "불꽃": "#E56C3E",
  "물": "#5185C5",
  "풀": "#66A945",
  "전기": "#FBB917",
  "얼음": "#6DC8EB",
  "격투": "#E09C40",
  "독": "#735198",
  "땅": "#9C7743",
  "비행": "#A2C3E7",
  "에스퍼": "#DD6B7B",
  "벌레": "#9FA244",
  "바위": "#BFB889",
  "고스트": "#684870",
  "드래곤": "#535CA8",
  "악": "#4C4948",
  "강철": "#69A9C7",
  "페어리": "#DAB4D4",
};

const usePokemonData = (count = 20, maxId = 151) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      console.log('Fetching Pokemon data...');
      const ids = getRandomPokemonIds(count, maxId);
      const data = await Promise.all(ids.map(async (id) => {
        const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const { data: species } = await axios.get(pokemon.species.url);

        const descriptionEntry = species.flavor_text_entries?.find(entry => entry.language.name === 'ko');
        const description = descriptionEntry ? descriptionEntry.flavor_text : '설명이 없습니다';

        const categoryEntry = species.genera?.find(genus => genus.language.name === 'ko');
        const category = categoryEntry ? categoryEntry.genus : '카테고리 없음';

        const types = await Promise.all(pokemon.types.map(async (typeInfo) => {
          return await fetchTypeInKorean(typeInfo.type.url);
        }));

        const firstType = types[0];
        const backgroundColor = typeColors[firstType] || '#fff';

        const abilityInfo = pokemon.abilities.length > 0 ? pokemon.abilities[0].ability : null;
        const ability = abilityInfo ? await fetchAbilityInKorean(abilityInfo.url) : '어빌리티 없음';
        const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

        return {
          id: pokemon.id,
          image,
          name: species.names.find(name => name.language.name === 'ko')?.name || pokemon.name,
          type: types.join(', '),
          description,
          category,
          ability,
          backgroundColor,
        };
      }));

      console.log('Pokemon data fetched:', data);
      setPokemonData(data);
      setLoading(false);
    };

    fetchPokemonData();
  }, [count, maxId]);

  return { pokemonData, loading };
};

export default usePokemonData;
