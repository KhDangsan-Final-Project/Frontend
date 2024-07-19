import React, { useEffect, useState } from 'react';

const Chat = () => {
    const [webSocket, setWebSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.20.54:8090/ms2/ws');
        setWebSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = function(event) {
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
                    <p key={index}><strong>{msg.sender}: </strong>{msg.content}</p>
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
