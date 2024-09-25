// src/components/CreateOrder/CreateOrder.js
import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, Snackbar } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const steps = ['Product Details', 'Address Details', 'Order Confirmation'];

const CreateOrder = ({ productId }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Fetch saved addresses from the server
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/addresses');
                setAddresses(response.data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, []);

    const handleNext = () => {
        if (activeStep === 1 && !address) {
            setErrorMessage('Please select an address!');
            return;
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handlePlaceOrder = async () => {
        try {
            // First, ensure the address is saved if it's a new address
            if (newAddress) {
                await axios.post('/addresses', { address: newAddress });
            }

            // Then, place the order
            await axios.post('/orders', { productId, address: address || newAddress });
            alert('Your order is confirmed.');

            // Redirect to products page with a success message
            history.push('/products');
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div>
                {activeStep === 0 && (
                    <div>
                        <Typography variant="h6">Product Details</Typography>
                        <Typography variant="body1">You are ordering Product ID: {productId}</Typography>
                    </div>
                )}

                {activeStep === 1 && (
                    <div>
                        <Typography variant="h6">Address Details</Typography>
                        <TextField
                            select
                            label="Select Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                            variant="outlined"
                        >
                            {addresses.map(addr => (
                                <option key={addr.id} value={addr.address}>{addr.address}</option>
                            ))}
                        </TextField>
                        <TextField
                            label="New Address"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                )}

                {activeStep === 2 && (
                    <div>
                        <Typography variant="h6">Order Confirmation</Typography>
                        <Typography variant="body1">Confirm your order for Product ID: {productId}</Typography>
                        <Typography variant="body1">Address: {address || newAddress}</Typography>
                    </div>
                )}

                {activeStep === steps.length ? (
                    <div>
                        <Typography variant="h5">All steps completed</Typography>
                    </div>
                ) : (
                    <div>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}>
                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                        </Button>
                    </div>
                )}
            </div>

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage('')}
                message={errorMessage}
            />
        </div>
    );
};

export default CreateOrder;
