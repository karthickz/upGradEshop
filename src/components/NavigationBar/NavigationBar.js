import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, InputAdornment } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const NavigationBar = ({ isLoggedIn, isAdmin, onLogout }) => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
            <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingCartIcon />
                <Typography variant="h6" style={{ marginLeft: '10px', color: 'white' }}>
                    upGrad E-Shop
                </Typography>
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                            style: { color: 'white' }, // Change text color to white
                        }}
                        style={{
                            margin: '0 20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light white background
                            border: 'none', // Remove border
                            width: '400px' // Set width to make it wider
                        }}
                    />
                </div>
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" onClick={onLogout}>Logout</Button>
                        {isAdmin && <Button color="inherit" component={Link} to="/add-products">Add Products</Button>}
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
