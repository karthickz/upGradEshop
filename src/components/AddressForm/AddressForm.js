// src/components/AddressForm/AddressForm.js
import React from 'react';
import { TextField, MenuItem, Typography } from '@mui/material';

const AddressForm = ({ addresses, address, setAddress, newAddress, setNewAddress }) => {
    return (
        <div>
            <Typography variant="h6">Address Details</Typography>
            <TextField
                select
                label="Select Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {addresses.map(addr => (
                    <MenuItem key={addr.id} value={addr.address}>
                        {addr.address}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="New Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />
        </div>
    );
};

export default AddressForm;
