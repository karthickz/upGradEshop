// src/components/Login/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Snackbar, SnackbarContent, Typography, Link, Paper, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const history = useHistory();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please enter both username and password.');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
                username: username.trim(),
                password: password.trim()
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Login response:", response.data); // Log the response

            // Create userData based on response
            const userData = {
                email: response.data.email,
                isAdmin: response.data.roles.includes('admin') // Check if the user has admin role
            };
            onLogin(userData);

            console.log("Navigating to /products");
            history.push('/products'); // Redirect to products page
        } catch (error) {
            console.error("Login failed:", error); // Log the full error
            const errorMessage = error.response?.data?.message || error.message || "Login failed. Please check your credentials and try again.";
            setError(errorMessage);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ff66b2',
                    borderRadius: '50%',
                    width: '54px',
                    height: '54px',
                    margin: '0 auto 20px'
                }}>
                    <LockIcon style={{ fontSize: '32px', color: '#ffffff' }} />
                </div>
                <Typography variant="h5" gutterBottom>Sign In</Typography>

                <Box style={{ marginBottom: '1rem' }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: '1rem', width: '300px' }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '1rem', width: '300px' }}
                    />
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <SnackbarContent
                        message={error}
                        style={{ backgroundColor: 'red' }}
                    />
                </Snackbar>

                <Button
                    onClick={handleLogin}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '1rem', width: '300px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'SIGN IN'}
                </Button>

                <Typography style={{ marginBottom: '1rem' }}>
                    <Link href="#" onClick={() => history.push('/signup')}>
                        Don't have an account? Sign Up
                    </Link>
                </Typography>

                <Typography variant="body2" color="textSecondary">Copyright © upGrad 2021</Typography>
            </Paper>
        </div>
    );
};

export default Login;
