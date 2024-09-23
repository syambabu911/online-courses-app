import React, { useState } from 'react';
import axios from 'axios';


const CreateChat = ({ onCreate }) => {
  const [chatName, setChatName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('userdetails'));

  const handleCreateChat = () => {
    if (!storedUser) {
      setErrorMessage('User details are missing. Please log in again.');
      return;
    }

    axios.post(
      'http://127.0.0.1:8000/chats/',
      {
        name: chatName,
        user: storedUser.username, // Pass user details if required by your backend
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
      }
    )
      .then(response => {
        setChatName('');
        setErrorMessage('');
        onCreate(response.data); // Pass the new chat data back to the parent component
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setErrorMessage('You must be logged in to create a chat.');
        } else {
          setErrorMessage('Error creating chat. Please try again.');
        }
        console.error('Error creating chat:', error);
      });
  };

  return (
    <div className="create-chat-container">
      <h2>Create New Chat</h2>
      <input
        type="text"
        placeholder="Enter Any Text For Creating ID"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
      />
      <button onClick={handleCreateChat}>Create</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreateChat;
