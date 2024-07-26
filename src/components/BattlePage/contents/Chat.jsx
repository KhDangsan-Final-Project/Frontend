import React, { useEffect, useState } from 'react';
import styles from './css/chat.module.css';
// props로 nickname을 받도록 수정
const Chat = ({ nickname }) => {
    const [webSocket, setWebSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // WebSocket 연결 설정
        const ws = new WebSocket('ws://192.168.20.54:8090/ms2/chat');
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

    return (
        <div>
            <h1 className={styles.title}>Poke Library CHAT</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} className={styles.title}>
                        <strong>{msg.nickname || "unknown"}: </strong>{msg.content || "empty"}
                    </p>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
