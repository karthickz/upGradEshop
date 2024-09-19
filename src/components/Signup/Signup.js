// src/components/Signup/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material'; // Use @mui/material for consistency
import LockIcon from '@mui/icons-material/Lock'; // Import Lock Icon

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await axios.post('https://dev-project-ecommerce.upgrad.dev/api/users', {
                firstName,
                lastName,
                email,
                password,
                contactNumber,
            });
            alert("Signup successful!");
        } catch (error) {
            console.error("Signup failed", error.response?.data || error.message);
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
                {/* Circular Lock Icon with Bright Background */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ff66b2', // Brighter pink
                    borderRadius: '50%',
                    width: '54px',  // 10% smaller than 60px
                    height: '54px', // 10% smaller than 60px
                    margin: '0 auto 20px'
                }}>
                    <LockIcon style={{ fontSize: '32px', color: '#ffffff' }} /> {/* 10% smaller icon */}
                </div>
                <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>Sign Up</Typography>
                <TextField
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Contact Number"
                    onChange={(e) => setContactNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignup}
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Sign Up
                </Button>
                <Typography align="center" style={{ marginTop: '20px' }}>
                    Already have an account? <a href="/signin">Sign in</a>
                </Typography>
            </Paper>
        </div>
    );
};

export default Signup;
