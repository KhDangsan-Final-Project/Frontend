import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function BoardContent() {
    const { boardNo } = useParams();
    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBoard() {
            try {
                const response = await axios.get(`http://teeput.synology.me:30112/ms1/board/${boardNo}`);
                setBoard(response.data);
            } catch (err) {
                setError(err);
            }
        }
        fetchBoard();

    }, [boardNo]);

    if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다!</div>;


    return (
        <div>
            {board ? (
                <table>
                    <tbody>
                        <tr>
                            <th>글번호</th>
                            <td>{board.boardNo}</td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>{board.boardTitle}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>{board.id}</td>
                        </tr>
                        <tr>
                            <th>조회수</th>
                            <td>{board.boardCount}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                {board.boardContent}
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>게시글이 없습니다.</div> // board가 없을 때 처리
            )}
            <hr />
        </div>
    );
}