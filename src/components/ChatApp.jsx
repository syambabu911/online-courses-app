import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChatApp() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null); // Use useRef to persist recognition instance
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();

        // Initialize the Web Speech API
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                setNewMessage((prevMessage) => prevMessage + ' ' + speechToText);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition; // Assign to ref
        } else {
            alert('Your browser does not support speech recognition.');
        }
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/messages/');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        const formData = new FormData();
        if (newMessage.trim() !== '') {
            formData.append('text', newMessage);
            formData.append('type', 'text');
            setNewMessage('');
        }
        if (file) {
            formData.append('file', file);
            formData.append('type', 'file');
            setFile(null);
        }

        try {
            await axios.post('http://127.0.0.1:8000/messages/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleMicrophoneClick = () => {
        const recognition = recognitionRef.current; // Access from ref
        if (recognition) {
            if (isListening) {
                recognition.stop();
            } else {
                setIsListening(true);
                recognition.start();
            }
        } else {
            alert('Speech recognition is not supported in your browser.');
        }
    };

    const handleBroadcast = () => {
        navigate('/broadcast');
    };
    const handleback=()=>{
        navigate(-1)
      }
    

    return (
        <div className="chat-app">
                    <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg></button>
            <div className="chat-header">
                <h2>Chats</h2>
                <button onClick={handleBroadcast}>Broad Cast</button>
            </div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message.type === 'text' ? (
                            <p>{message.text}</p>
                        ) : (
                            <a href={message.file} download>
                                {message.file}
                            </a>
                        )}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                    Choose File
                </label>
                <button
                    id="mic"
                    className={isListening ? 'active' : ''}
                    onClick={handleMicrophoneClick}
                >
                    <i className="fas fa-microphone"></i>🎙️
                </button>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatApp;
