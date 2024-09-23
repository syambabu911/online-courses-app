import React, { useState } from 'react';
import axios from 'axios';


const SendMessage = ({ chatId }) => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('userdetails'));

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSendMessage = () => {
    if (!storedUser || username !== storedUser.username) {
      alert('User name does not matched😬');
      console.error('Username does not match.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('text', text);
    formData.append('chat', chatId);
    if (file) {
      formData.append('file', file);
    }

    axios.post('http://127.0.0.1:8000/messages/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setText('');
      setFile(null);
      setSuccessMessage('Message sent successfully!');
      setErrorMessage('');
      console.log('Message sent:', response.data);
    })
    .catch(error => {
      setErrorMessage('Error sending message. Please try again.');
      setSuccessMessage('');
      console.error('Error sending message:', error);
    });
  };

  const handleStartRecording = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks);
          const audioURL = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioURL);
          audio.play();

          // Convert audio to text using Web Speech API
          const recognition = new window.webkitSpeechRecognition();
          recognition.lang = 'en-US';
          recognition.interimResults = false;

          recognition.addEventListener('result', event => {
            const speechText = event.results[0][0].transcript;
            setText(speechText);
          });

          recognition.start();
          setRecording(false);
        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000); // Record for 5 seconds
      });
  };

  return (
    <div className="send-message-container">
      <input
        type="text"
        placeholder="Enter your valid username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h2>Send Message</h2>
      <input
        type="text"
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
      <button onClick={handleStartRecording} disabled={recording} className="recording-button">
        {recording ? 'Recording...' : 'Record Voice'}🎙️
      </button>
      <button onClick={handleSendMessage}>Send</button>

      {/* Display success or error message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SendMessage;
