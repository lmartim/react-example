import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from '@mui/material';

import FakerApi from '../../services/fake-api/fakerApi'

function CreatePost() {
    const fakerApi = new FakerApi()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    const handleSubmitPost = () => {
        const createPost = async () => (fakerApi.post('/posts/create', {
            title,
            content
        }))

        createPost()
            .then(response => {
                console.log(response)
                navigate("/posts")
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Typography variant="h4" component="h2" align="center">Cadastrar Post</Typography>
            <TextField fullWidth label="Título" size="small" variant="outlined" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Título do Post" />
            <TextField fullWidth label="Conteúdo" size="small" variant="outlined" margin="normal" value={content} onChange={(e) => setContent(e.target.value)} id="content" placeholder="Conteúdo do Post" multiline rows={4} />
            <Button fullWidth variant="contained" onClick={handleSubmitPost} type="submit">Cadastrar Post</Button>
        </>
    );
}

export default CreatePost;