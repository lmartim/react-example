import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from '@mui/material';

import Snackbar from '../../components/Utils/Snackbar';

import FakerApi from '../../services/fake-api/fakerApi'

function Register() {
    const fakerApi = new FakerApi()

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [snackState, setSnackState] = useState(false)
    const [snackMessage, setSnackMessage] = useState("snack")
    const [snackSeverity, setSnackSeverity] = useState("info")

    const navigate = useNavigate()

    const handleSubmitRegister = () => {
        const registerUser = async () => (fakerApi.post('/register', {
            name,
            username,
            password
        }))

        registerUser()
            .then(response => {
                console.log(response)
                navigate("/")
            }).catch(error => {
                console.log(error)

                setSnackState(true)
                setSnackMessage("Não foi possível realizar o cadastro.")
                setSnackSeverity("error")
            })
    }

    return (
        <>
            <Typography variant="h4" component="h2" align="center">Registrar</Typography>
            <TextField fullWidth label="Nome" size="small" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Seu Nome" />
            <TextField fullWidth label="Usuário" size="small" variant="outlined" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Nome de Usuário" />
            <TextField fullWidth label="Senha" size="small" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Sua Senha" type="password" />
            <Button fullWidth variant="contained" onClick={handleSubmitRegister} type="submit">Registrar</Button>

            <Snackbar open={snackState} message={snackMessage} severity={snackSeverity} setSnackState={setSnackState} />
        </>
    );
}

export default Register;