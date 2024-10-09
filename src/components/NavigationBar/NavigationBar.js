// src/components/NavigationBar/NavigationBar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = ({ user, onLogout }) => {
    const location = useLocation(); // Get current location

    // Debugging logs
    console.log('Current Location:', location.pathname);
    console.log('User:', user); // Log the user object to see its properties
    console.log('Is Admin:', user?.isAdmin); // Check if user is admin

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
                        {location.pathname === '/products' && user.isAdmin && ( // Show Add Product link only on /products page for admin
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
