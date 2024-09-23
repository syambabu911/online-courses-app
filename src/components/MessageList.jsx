import React, { useState, useEffect } from 'react';


const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/messages/${chatId}/`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, [chatId]);

  return (
    <div className="message-list-container">
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <p className="username"><strong>{message.user.username}</strong></p>
            <p>{message.text}</p>
            <p className="timestamp"><small>{new Date(message.created_at).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
