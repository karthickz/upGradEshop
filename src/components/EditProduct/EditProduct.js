// src/pages/EditProduct.js

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Grid,
    FormControl,
    Snackbar,
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const EditProduct = ({ authToken }) => {
    console.log('Received Auth Token:', authToken); // Log the received auth token
    const history = useHistory();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [manufacturer, setManufacturer] = useState('');
    const [availableItems, setAvailableItems] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Pass the auth token here
                    },
                });
                const product = response.data;
                setName(product.name);
                setSelectedCategory({ value: product.category, label: product.category });
                setManufacturer(product.manufacturer);
                setAvailableItems(product.availableItems);
                setPrice(product.price);
                setImageUrl(product.imageUrl);
                setDescription(product.description);
            } catch (error) {
                console.error('Error fetching product details:', error.response?.data || error.message);
                setErrorMessage('Failed to load product details');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://dev-project-ecommerce.upgrad.dev/api/products/categories');
                const categoryOptions = response.data.map(category => ({ value: category, label: category }));
                setCategories(categoryOptions);
            } catch (error) {
                console.error('Error fetching categories:', error.response?.data || error.message);
                setErrorMessage('Failed to load categories');
            }
        };

        fetchProductDetails();
        fetchCategories();
    }, [id, authToken]);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const productData = {
            name,
            category: selectedCategory ? selectedCategory.value : null,
            manufacturer,
            availableItems: parseInt(availableItems, 10),
            price: parseFloat(price),
            imageUrl,
            description,
        };

        console.log('Auth Token:', authToken); // Check token
        console.log('Product Data:', productData); // Log product data

        try {
            const response = await axios.put(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, productData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`, // Pass the auth token here
                },
            });
            console.log('API Response:', response.data); // Log response
            setSuccessMessage('Product updated successfully!');
            setErrorMessage(''); // Clear any previous error messages
            history.push('/products');
        } catch (error) {
            console.error('Error updating product:', error.response?.data || error.message);
            setErrorMessage(`Failed to update product: ${error.response?.data?.message || error.message}`);
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Edit Product
                </Typography>
                <form onSubmit={handleUpdateProduct}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <CreatableSelect
                                    options={categories}
                                    onChange={setSelectedCategory}
                                    value={selectedCategory}
                                    isClearable
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            backgroundColor: 'white',
                                            borderColor: 'rgba(0, 0, 0, 0.23)',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: 'rgba(0, 0, 0, 0.87)',
                                            },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 100,
                                        }),
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Manufacturer"
                                variant="outlined"
                                fullWidth
                                value={manufacturer}
                                onChange={(e) => setManufacturer(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Available Items"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={availableItems}
                                onChange={(e) => setAvailableItems(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Image URL"
                                variant="outlined"
                                fullWidth
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Update Product
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar
                    open={!!successMessage}
                    onClose={handleCloseSnackbar}
                    message={successMessage}
                    autoHideDuration={3000}
                />
                <Snackbar
                    open={!!errorMessage}
                    onClose={handleCloseSnackbar}
                    message={errorMessage}
                    autoHideDuration={3000}
                />
            </div>
        </div>
    );
};

export default EditProduct;
