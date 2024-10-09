// src/components/App/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Products from '../Products/Products';
import AddProducts from '../AddProducts/AddProducts';
import ProductDetails from '../ProductDetails/ProductDetails';
import CreateOrder from '../CreateOrder/CreateOrder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
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
                    <Products isLoggedIn={!!user} isAdmin={user?.isAdmin} /> {/* Pass login status and isAdmin to Products */}
                </Route>
                <Route path="/product/:id" component={ProductDetails} />
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
