// src/pages/AddProduct.js

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

const AddProduct = () => {
    const history = useHistory();
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
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://dev-project-ecommerce.upgrad.dev/api/products/categories');
                const categoryOptions = response.data.map(category => ({ value: category, label: category }));
                setCategories(categoryOptions);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Failed to load categories');
            }
        };

        fetchCategories();
    }, []);

    const handleAddProduct = async (e) => {
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

        try {
            await axios.post('https://dev-project-ecommerce.upgrad.dev/api/products', productData);
            setSuccessMessage('Product added successfully!');
            // Reset form fields
            setName('');
            setSelectedCategory(null);
            setManufacturer('');
            setAvailableItems('');
            setPrice('');
            setImageUrl('');
            setDescription('');
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Failed to add product');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px' }}> {/* Set a fixed width for the form */}
                <Typography variant="h4" gutterBottom align="center">
                    Add Product
                </Typography>
                <form onSubmit={handleAddProduct}>
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
                                            backgroundColor: 'white', // Set background color
                                            borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
                                            boxShadow: 'none', // Remove shadow
                                            '&:hover': {
                                                borderColor: 'rgba(0, 0, 0, 0.87)', // Change border on hover
                                            },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 100, // Ensure the dropdown is above other elements
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
                                Add Product
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

export default AddProduct;
