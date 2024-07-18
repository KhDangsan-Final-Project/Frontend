import { useState, useEffect } from 'react';
import axios from 'axios';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 1000); // 1초마다 메시지 가져오기
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:9998/api/chat/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        const chatMessage = {
            sender: "User",
            content: message,
        };
        try {
            await axios.post('http://localhost:9998/api/chat/sendMessage', chatMessage);
            setMessage("");
            fetchMessages();  // Send message 후에 메시지 목록을 업데이트합니다.
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { messages, message, setMessage, sendMessage };
};

export default useChat;
