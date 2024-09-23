import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const LogoutButton = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userdetails')));
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/logout/', {}, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`,
                },
            });
            if (response.status === 200) {
                // localStorage.removeItem('authToken');
                localStorage.clear();
                alert('Successfully logged out');
                navigate('/buttons');
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    
    return (
        <div style={{backgroundColor:'whitesmoke'}}>
            {user ? (
                <div>
                    <p style={{color:'blue'}}>Welcome, {user.username}!</p>
                    {/* <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>State: {user.state}</p> */}
                    <button onClick={handleLogout} style={{backgroundColor:'greenyellow'}}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LogoutButton;
