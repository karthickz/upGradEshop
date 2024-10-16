// src/components/ProductDetails/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Box, CircularProgress } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const history = useHistory(); // Hook for navigation
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Failed to load product details.");
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleQuantityChange = (event) => {
        const value = Math.max(1, event.target.value); // Ensure quantity is at least 1
        setQuantity(value);
    };

    const handleBuyNow = () => {
        // Redirect to the CreateOrder page with the product ID
        history.push(`/create-order/${id}`);
    };

    if (loading) {
        return <CircularProgress />; // Show loading spinner
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography variant="h6">Product not found.</Typography>;
    }

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    alt={product.name || "Product image not available"}
                    image={product.image || 'fallback-image-url.jpg'} // Replace with fallback image URL if necessary
                    title={product.name}
                    style={{ height: 'auto', objectFit: 'contain' }}
                />
                <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="body1" color="textSecondary">Price: ₹{product.price}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                    <Box style={{ marginTop: '20px' }}>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            inputProps={{ min: 1 }}
                            style={{ width: '100%' }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBuyNow}
                        style={{ marginTop: '20px', width: '100%' }}
                    >
                        Buy Now
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductDetails;
