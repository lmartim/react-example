import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material'

import FakerApi from '../../services/fake-api/fakerApi'

function EditPost({ postId, open, setEditPost, setFetchPost }) {
    const fakerApi = new FakerApi()

    const [postNewTitle, setPostNewTitle] = useState("");
    const [postNewContent, setPostNewContent] = useState("");

    async function handleEditComment() {
        await fakerApi.post('/posts/update', {
            post_id: parseInt(postId),
            post: {
                title: postNewTitle,
                content: postNewContent
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        setFetchPost(true)
        setEditPost(false)
    }

    return (
        <Dialog open={open} onClose={() => setEditPost(false)}>
            <DialogContent>
                <Typography gutterBottom variant="h5" component="div">Atualizar Post</Typography>
                <TextField fullWidth label="Tìtulo" size="small" variant="outlined" margin="normal" value={postNewTitle} onChange={(e) => setPostNewTitle(e.target.value)} id="postNewTitle" placeholder="Novo título" />
                <TextField fullWidth label="Comentário" size="small" variant="outlined" margin="normal" value={postNewContent} onChange={(e) => setPostNewContent(e.target.value)} id="postNewContent" placeholder="Novo conteúdo" multiline rows={4} />
                <Button fullWidth variant="contained" onClick={handleEditComment} type="submit">Atualizar</Button>
            </DialogContent>
        </Dialog>
    );
}

export default EditPost