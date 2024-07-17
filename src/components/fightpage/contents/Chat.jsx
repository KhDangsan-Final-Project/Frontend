import React from 'react';
import useChat from './hooks/useChat'; // useChat 훅 가져오기

const Chat = () => {
    const { messages, message, setMessage, sendMessage } = useChat();

    return (
        <div id="chat" >
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg.sender}: {msg.content}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
