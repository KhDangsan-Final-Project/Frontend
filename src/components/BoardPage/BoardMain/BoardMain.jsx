import styles from './css/BoardMain.module.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 @param {Array} boardList
 @return {Array}
 */
const groupBoards = (boardList) => {
    const limitedBoardList = boardList.slice(0,8);
    return limitedBoardList.reduce((rows, board, idx) => {
        if (idx % 2 === 0) {
            rows.push([board]);
        } else {
            rows[rows.length - 1].push(board);
        }
        return rows;
    }, []);
};


export default function BoardMain({ showWrite, token }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [boardList, setBoardList] = useState([]);
    const [groupedBoards, setGroupedBoards] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const write = () => {
        showWrite();
    };
    
    useEffect(() => {
        console.log('BoardMain token:', token);
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);
    
    
    const alertMsg = () => {
        alert("로그인 후 이용해주시기 바랍니다.");
    };
    

    useEffect(() => {
        setGroupedBoards(groupBoards(boardList));
    }, [boardList]);

    useEffect(() => {
        async function fetchBoardList() {
            try {
                const response = await axios.get("http://localhost:8090/ms1/board/list");

                setBoardList(response.data.boards);
            } catch (err) {
                setError(err);

            }

        }
        fetchBoardList();

    }, []);
    if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다!</div>;



    return (
        <div className={styles.container}>
            <h2>게시판</h2>
            <div className={styles.button}>
                <Link to={'/boardNotice'} className={styles.notice}>공지사항</Link>
                <Link to={'/boardEvent'} className={styles.event}>이벤트</Link>
            </div>
            <div className={styles.option}>
                <Link to={'/boardList'} className={styles.moreView}>최신글 더보기</Link>
                <div className={styles.write}>
                    {isLoggedIn ? (
                        <button className={styles.writeBtn} onClick={write}>글쓰기</button>
                    ) : (
                        <button className={styles.writeBtn} onClick={alertMsg}><Link to="/login">글쓰기</Link></button>
                    )}</div>
            </div>
            <hr />
            <section>
                {groupedBoards.map((row, rowIndex) => (
                    <article key={rowIndex} >
                        {row.map(board => (
                            <ul key={board.boardNo}>
                                <h5><Link to={`/boardContent/${board.boardNo}`}> {board.boardTitle}</Link></h5>
                                <li>
                                    <img src='/img/pokeball.png' /><span>{board.id}</span>
                                    &nbsp;
                                    <img src='/img/eye.png' /><span>{board.boardCount}</span>
                                    &nbsp;
                                    <span>{board.boardWrite}</span>
                                </li>
                                <hr/>
                            </ul>
                        ))}
                    </article>
                ))}
            </section>
        </div>
    )
}