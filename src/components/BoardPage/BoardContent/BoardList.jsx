import styles from "./css/BoardList.module.css"
import React, { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";

export default function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBoardList() {
            try {
                const response = await axios.get("http://localhost:8090/ms1/board/list" );
                
                setBoardList(response.data);
            } catch (err) {
                setError(err);

            }                                

        }
     fetchBoardList();
    
    }, []);
    if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다!</div>;


return (
    <div className={styles.container}>
        <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map(board => (
                        <tr key={board.boardNo}>
                            <td>{board.boardNo}</td>
                            <td><Link to="/boardContent"> {board.boardTitle}</Link></td>
                            <td>{board.id}</td>
                            <td>{board.boardCount}</td>
                            <td>{new Date(board.boardWrite).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div >
)
}