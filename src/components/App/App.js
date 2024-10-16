// src/components/App/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Products from '../Products/Products';
import AddProducts from '../AddProducts/AddProducts';
import ProductDetails from '../ProductDetails/ProductDetails';
import EditProduct from '../EditProduct/EditProduct'; // Import EditProduct
import CreateOrder from '../CreateOrder/CreateOrder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const App = () => {
    const [user, setUser] = useState(() => {
        // Retrieve the user data from localStorage on app load
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user data from localStorage
    };

    return (
        <Router>
            <NavigationBar user={user} onLogout={handleLogout} />
            <Switch>
                <Route path="/login">
                    <Login onLogin={handleLogin} />
                </Route>
                <Route path="/signup" component={Signup} />
                <Route path="/products">
                    <Products isLoggedIn={!!user} isAdmin={user?.isAdmin} />
                </Route>
                <Route path="/product/:id" component={ProductDetails} />
                <Route path="/edit-product/:id">
                    {/* Ensure authToken is passed correctly */}
                    <EditProduct authToken={user?.authToken} />
                </Route>
                <Route path="/create-order/:id" component={CreateOrder} />
                <Route path="/add-products">
                    <AddProducts isLoggedIn={!!user} />
                </Route>
                <Route path="/" exact>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <ShoppingCartIcon style={{ fontSize: '60px' }} />
                        <h1>Welcome to upGrad Eshop!</h1>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
