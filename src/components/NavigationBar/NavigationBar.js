// src/components/NavigationBar/NavigationBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar = ({ user, onLogout }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    E-commerce
                </Typography>

                <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                    <Button color="inherit">Home</Button>
                </Link>

                {user ? (
                    <>
                        {user.isAdmin && (
                            <Link to="/add-products" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                                <Button color="inherit">Add Product</Button>
                            </Link>
                        )}
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={onLogout}
                            style={{ backgroundColor: 'red', color: 'white' }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                            <Button color="inherit">Login</Button>
                        </Link>
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button color="inherit">Sign Up</Button>
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
