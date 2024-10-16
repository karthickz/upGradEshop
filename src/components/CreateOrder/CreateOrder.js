// src/components/CreateOrder/CreateOrder.js
import React, { useState, useEffect } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Snackbar,
    Box
} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm/AddressForm'; // Import the AddressForm component

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
        if (activeStep === 1 && !address && !newAddress) {
            setErrorMessage('Please select an address or enter a new address!');
            return;
        }
        setErrorMessage(''); // Clear any previous error messages
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handlePlaceOrder = async () => {
        try {
            // Save the new address if provided
            if (newAddress) {
                await axios.post('/addresses', { address: newAddress });
            }

            // Place the order
            await axios.post('/orders', { productId, address: address || newAddress });
            alert('Your order is confirmed.');

            // Redirect to products page with a success message
            history.push('/products');
        } catch (error) {
            console.error("Error placing order:", error);
            setErrorMessage('Failed to place the order. Please try again.');
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

            <Box sx={{ mt: 2 }}>
                {activeStep === 0 && (
                    <div>
                        <Typography variant="h6">Product Details</Typography>
                        <Typography variant="body1">You are ordering Product ID: {productId}</Typography>
                    </div>
                )}

                {activeStep === 1 && (
                    <AddressForm
                        addresses={addresses}
                        address={address}
                        setAddress={setAddress}
                        newAddress={newAddress}
                        setNewAddress={setNewAddress}
                    />
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                        >
                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                        </Button>
                    </div>
                )}
            </Box>

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
