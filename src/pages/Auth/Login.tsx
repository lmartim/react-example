import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from '@mui/material';

import Snackbar from '../../components/Utils/Snackbar';

import FakerApi from '../../services/fake-api/fakerApi'

function Login() {
    const fakerApi = new FakerApi()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [snackState, setSnackState] = useState(false)
    const [snackMessage, setSnackMessage] = useState("snack")
    const [snackSeverity, setSnackSeverity] = useState("info")

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value)
        }
        if (id === "password") {
            setPassword(value)
        }
    }

    const handleSubmitLogin = () => {
        const login = async () => (fakerApi.post('/login', {
            username,
            password
        }))

        login()
            .then(response => {
                console.log(response)
                navigate("/posts")
            }).catch(error => {
                console.log(error)

                setSnackState(true)
                setSnackMessage("Não foi possível realizar o login.")
                setSnackSeverity("error")
            })
    }

    return (
        <>
            <Typography variant="h4" component="h2" align="center">Login</Typography>
            <TextField fullWidth label="Usuário" size="small" variant="outlined" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Nome de Usuário" />
            <TextField fullWidth label="Senha" size="small" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Sua Senha" type="password" />
            <Button fullWidth variant="contained" onClick={handleSubmitLogin} type="submit">Login</Button>

            <Snackbar open={snackState} message={snackMessage} severity={snackSeverity} setSnackState={setSnackState} />
        </>
    );
}

export default Login;