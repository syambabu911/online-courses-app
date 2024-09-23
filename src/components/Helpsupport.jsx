// src/HelpSupportForm.js
import React, { useState } from 'react';
import axios from 'axios';

const HelpSupportForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        issue: '',
        description: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/helpsupport/', formData)
            .then(response => {
                console.log('Form submitted successfully:', response.data);
                setSuccessMessage('Form submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    issue: '',
                    description: ''
                });
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });
    };

    return (
        <div className='help-support'>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone:
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <br />
            <label>
                Issue:
                <input type="text" name="issue" value={formData.issue} onChange={handleChange} />
            </label>
            <br />
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default HelpSupportForm;
