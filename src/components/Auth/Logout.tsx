import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

import FakerApi from '../../services/fake-api/fakerApi'

function Logout() {
    const fakerApi = new FakerApi()

    const navigate = useNavigate();

    const handleSubmitLogout = () => {
        const logout = async () => (fakerApi.post('/logout', {}))

        logout()
            .then(response => {
                console.log(response)
                navigate("/");
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <Button variant="outlined" onClick={() => handleSubmitLogout()}>Logout</Button>
    );
}

export default Logout;