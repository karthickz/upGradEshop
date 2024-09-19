// src/components/Login/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://dev-project-ecommerce.upgrad.dev/api/auth', {
                email,
                password,
            });
            const userData = { email, isAdmin: response.data.isAdmin }; // Adjust based on your API response
            onLogin(userData);
            history.push('/products');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>Sign In</Button>
        </div>
    );
};

export default Login;
