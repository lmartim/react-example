import React from 'react';
import { Snackbar as MSnackbar, Alert } from '@mui/material';

function Snackbar({ open, message, severity, setSnackState }) {
    return (
        <MSnackbar open={open} autoHideDuration={4000} onClose={() => setSnackState(false)}>
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </MSnackbar>
    )
}

export default Snackbar