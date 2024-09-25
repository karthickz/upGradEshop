// src/components/App/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar'; // Adjusted path
import Login from '../Login/Login'; // Adjusted path
import Signup from '../Signup/Signup'; // Adjusted path
import Products from '../Products/Products'; // Assuming Products.js is at the same level
import AddProducts from '../AddProducts/AddProducts'; // Assuming AddProducts.js is at the same level
import ProductDetails from '../ProductDetails/ProductDetails'; // Import ProductDetails
import CreateOrder from '../CreateOrder/CreateOrder'; // Import CreateOrder
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'; // Logo icon

const App = () => {
    console.log('App component rendered');

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
                    <Products isLoggedIn={!!user} /> {/* Pass login status to Products */}
                </Route>
                <Route path="/product/:id" component={ProductDetails} /> {/* Product details route */}
                <Route path="/create-order/:id" component={CreateOrder} /> {/* Create order route */}
                <Route path="/add-products">
                    <AddProducts isLoggedIn={!!user} /> {/* Pass login status to AddProducts */}
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
