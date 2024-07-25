import React, { useEffect, useState } from 'react';

// props로 token을 받도록 수정
const Chat = ({ token }) => {
    const [webSocket, setWebSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.20.54:8090/ms2/ws');
        setWebSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
            // 연결 시 토큰 전송
            ws.send(JSON.stringify({ token: token }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received data:', data);

                // 서버에서 받은 nickname 설정
                if (data.sender) {
                    setUserInput(data.sender);
                }

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
    }, [token]);

    const sendMessage = () => {
        if (webSocket && messageInput.trim() !== '') {
            const message = {
                sender: userInput, // 사용자의 닉네임 설정
                content: messageInput
            };
            webSocket.send(JSON.stringify(message));
            setMessageInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            {/* token 출력 */}
            <p>Token: {token}</p>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender || "unknown"}: </strong>{msg.content || "empty"}</p>
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
