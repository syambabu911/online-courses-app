import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import CreateChat from './CreateChat'; // Ensure you import this component


const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userdetails')) || { id: null });

  useEffect(() => {
    // Fetch chats from API
    fetch('http://127.0.0.1:8000/chats/')
      .then(response => response.json())
      .then(data => {
        // Sort chats by ID in descending order
        const sortedChats = data.sort((a, b) => b.id - a.id);
        setChats(sortedChats);
      })
      .catch(error => console.error('Error fetching chats:', error));
  }, []);

  // Get the last chat ID
  const lastChat = chats.length > 0 ? chats[0] : null;

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleCreateChat = (newChat) => {
    setChats([newChat, ...chats]); // Add the new chat to the beginning of the list
    setSelectedChatId(newChat.id);
  };

  return (
    <div className="chat-list-container">
      <h2>Chat List</h2>
      {lastChat ? (
        <div>
          <h3>{lastChat.name} (ID: {lastChat.id})</h3>
          <button onClick={() => handleChatSelect(lastChat.id)}>Select Chat</button>
        </div>
      ) : (
        <p>No chats available.</p>
      )}
      {/* <h2>Chat List</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} style={{ cursor: 'pointer' }} onClick={() => handleChatSelect(chat.id)}>
            <h3>{chat.name} (ID: {chat.id})</h3>
          </li>
        ))}
      </ul> */}
      <CreateChat onCreate={handleCreateChat} />
      {selectedChatId && (
        <div>
          <MessageList chatId={selectedChatId} />
          <SendMessage chatId={selectedChatId} user={user} />
        </div>
      )}
    </div>
  );
};

export default ChatList;
