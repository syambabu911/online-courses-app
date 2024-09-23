import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileForm = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userdetails')));
    
    const handleMyCourses = () => {
        navigate('/courses');
    };

    const handleInfo = () => {
        navigate(''); 
    };

    return (
        <center>
            <div className='profile'>
            {user ? (
                <div>
                    <p className='m-0' style={{color:'blue'}}>welcome, {user.username}!</p>
                    <button onClick={handleMyCourses}>My Courses</button>
                    <button onClick={handleInfo}>Info</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </center>

    );
};

export default ProfileForm;
