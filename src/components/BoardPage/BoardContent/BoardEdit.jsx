import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardWrite from './BoardWrite';

export default function BoardEdit() {
    const { boardNo } = useParams();
    const [boardData, setBoardData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 게시물 데이터를 가져와서 초기화
        async function fetchBoardData() {
            try {
                const response = await axios.get(`http://localhost:8090/ms1/board/${boardNo}`);
                setBoardData(response.data);
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        }

        fetchBoardData();
    }, [boardNo]);

    const handleSubmit = async (updatedData) => {
        try {
            await axios.put(`http://localhost:8090/ms1/board/update/${boardNo}`, updatedData);
            navigate(`/board/${boardNo}`); // 수정 완료 후 해당 게시물 보기 페이지로 이동
        } catch (error) {
            console.error('Error updating board data:', error);
        }
    };

    return (
        <div>
            {boardData ? (
                <BoardWrite 
                    initialData={boardData} 
                    onSubmit={handleSubmit} 
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
