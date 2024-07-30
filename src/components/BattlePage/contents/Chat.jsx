import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import styles from './css/chat.module.css';

// ===================================== 임시 폐기 =======================================

const Chat = ({ nickname }) => {
    const [webSocket, setWebSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatBoxRef = useRef(null); // chatBox의 참조를 저장할 변수

    useEffect(() => {
        // WebSocket 연결 설정
        const ws = new WebSocket('wss://teeput.synology.me:30112/ms2/chat');
        setWebSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received data:', data);
                setMessages(prevMessages => [...prevMessages, data]);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        ws.onclose = (event) => {
            console.log('Disconnected from WebSocket:', event);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        // chatBoxRef가 존재하고, 메시지가 업데이트되면 스크롤을 맨 아래로 이동
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (webSocket && messageInput.trim() !== '') {
            // 메시지 객체 생성
            const message = {
                nickname: nickname, // 사용자의 닉네임 설정
                content: messageInput, // 페이지에서 입력한 내용
            };
            
            // 메시지를 JSON으로 변환하여 서버로 전송
            webSocket.send(JSON.stringify(message));
            
            // 입력 필드 초기화
            setMessageInput('');
        }
    };

    // 엔터키를 눌렀을 때 메시지를 전송하는 함수
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 동작인 줄바꿈 방지
            sendMessage();
        }
    };

    return (
        <Draggable>
            <div className={styles.container}>
                <h1 className={styles.title}>Poke Library CHAT</h1>
                <div ref={chatBoxRef} className={styles.chatBox}>
                    {messages.map((msg, index) => (
                        <p key={index} className={styles.message}>
                            <strong>{msg.nickname || "unknown"}: </strong>{msg.content || "empty"}
                        </p>
                    ))}
                </div>
                <div className={styles.inputArea}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown} // 엔터키 입력 감지
                        placeholder="Type your message..."
                        className={styles.pokemonSearch}
                    />
                    <button onClick={sendMessage} className={styles.button}>: Send :</button>
                </div>
            </div>
        </Draggable>
    );
};

export default Chat;
