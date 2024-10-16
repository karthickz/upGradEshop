import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, ToggleButton, ToggleButtonGroup, MenuItem, Button, Select, FormControl, InputLabel, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import product1Image from '../../assets/Images/product1.jpg'; // Example image path for product1

const Products = ({ isLoggedIn, isAdmin, authToken }) => {
    const history = useHistory();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteProductId, setDeleteProductId] = useState(null); // Track product to delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Track delete dialog state

    // Extract search query from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [location.search]);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            history.push('/login');
        }
    }, [isLoggedIn, history]);

    // Fetch products and categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://dev-project-ecommerce.upgrad.dev/api/products/categories', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error.response ? error.response.status : error.message);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dev-project-ecommerce.upgrad.dev/api/products', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error.response ? error.response.status : error.message);
            }
        };

        fetchCategories();
        fetchProducts();
    }, [authToken]);

    // Sort and filter products based on category, sortOrder, and search query
    const sortedProducts = () => {
        let sorted = [...products];
        if (sortOrder === 'priceLowToHigh') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'priceHighToLow') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'newest') {
            sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }

        // Filter by category
        let filteredProducts = sorted.filter(product => selectedCategory === 'all' || product.category === selectedCategory);

        // Filter by search query
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filteredProducts;
    };

    // Handle category change
    const handleCategoryChange = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    // Handle sorting change
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Handle edit click - navigate to edit page
    const handleEditClick = (productId) => {
        history.push(`/edit-product/${productId}`);
    };

    // Handle delete click - open delete confirmation dialog
    const handleDeleteClick = (productId) => {
        setDeleteProductId(productId);
        setOpenDeleteDialog(true);
    };

    // Confirm delete - send delete request to API
    const confirmDelete = async () => {
        try {
            await axios.delete(`https://dev-project-ecommerce.upgrad.dev/api/products/${deleteProductId}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            // Remove the deleted product from the UI
            setProducts(products.filter(product => product.id !== deleteProductId));
            setOpenDeleteDialog(false); // Close dialog after deletion
        } catch (error) {
            console.error("Error deleting product:", error.response ? error.response.status : error.message);
        }
    };

    return (
        <div>
            {/* Sort and category toggles */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <FormControl variant="outlined" style={{ minWidth: 200 }}>
                        <InputLabel>Sort by</InputLabel>
                        <Select value={sortOrder} onChange={handleSortChange} label="Sort by">
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                            <MenuItem value="newest">Newest</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
                        <ToggleButton value="all">ALL</ToggleButton>
                        {categories.map((category) => (
                            <ToggleButton key={category} value={category}>
                                {category.toUpperCase()}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>

                <div style={{ flex: 1 }}></div>
            </div>

            {/* Display filtered products */}
            <Grid container spacing={3} style={{ padding: '20px' }}>
                {sortedProducts().length > 0 ? (
                    sortedProducts().map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    image={product1Image} // Use the imported image
                                    title={product.name}
                                    style={{ height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" component="div" style={{ flex: 1, textAlign: 'left' }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="h6" component="div" style={{ textAlign: 'right', color: '#ff5722' }}>
                                            ₹{product.price}
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" color="textSecondary">
                                        {product.description}
                                    </Typography>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                        <Button variant="contained" color="primary">
                                            Buy Now
                                        </Button>
                                        {isAdmin && (
                                            <div>
                                                <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(product.id)} style={{ marginRight: '10px' }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="small" color="error" onClick={() => handleDeleteClick(product.id)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
                        No products found.
                    </Typography>
                )}
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Products;
