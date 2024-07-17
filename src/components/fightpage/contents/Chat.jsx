import React, { useEffect, useState } from 'react';

const Chat = () => {
    const [webSocket, setWebSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:9998/ws');
        setWebSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = function(event) {
            try {
                const data = JSON.parse(event.data);
                console.log(data);
                // 여기서 data를 사용하여 작업을 진행합니다.
            } catch (error) {
                console.error('Error parsing JSON:', error);
                // 에러 처리를 추가하거나, 다른 방법으로 데이터를 처리합니다.
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (webSocket && messageInput.trim() !== '') {
            const message = {
                sender: 'user',
                content: messageInput
            };
            webSocket.send(JSON.stringify(message));
            setMessageInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}: </strong>
                        {msg.content}
                    </div>
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
