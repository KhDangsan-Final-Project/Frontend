import { useEffect, useState } from 'react';

const useRankData = () => {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    // 더미데이터 설정
    const dummyRanks = [
      {
        id: 1,
        name: "TEEPUT",
        rank: "1",
        img: "/img/info/1.jpg",
      },
      {
        id: 2,
        name: "aappoo0109",
        rank: "2",
        img: "/img/info/2.jpg",
      },
      {
        id: 3,
        name: "ju8027",
        rank: "3",
        img: "/img/info/3.jpg",
      },
      {
        id: 4,
        name: "BlueBearBeer",
        rank: "4",
        img: "/img/info/4.jpg",
      },
      {
        id: 5,
        name: "namsugnwoo",
        rank: "5",
        img: "/img/info/5.jpg",
      },
    ];
    setRanks(dummyRanks);
  }, []);

  return ranks;
};

export default useRankData;
