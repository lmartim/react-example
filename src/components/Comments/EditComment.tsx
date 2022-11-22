import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material'

import FakerApi from '../../services/fake-api/fakerApi'

function EditComment({ commentId, postId, open, setFetchComments, setEditComment }) {
    const fakerApi = new FakerApi()

    const [editedComment, setEditedComment] = useState("");

    async function handleEditComment() {
        await fakerApi.post('/comments/update', {
            post_id: parseInt(postId),
            comment_id: parseInt(commentId),
            comment: {
                content: editedComment
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        setFetchComments(true)
        setEditComment(false)
    }

    return (
        <Dialog open={open} onClose={() => setEditComment(false)}>
            <DialogContent>
                <Typography gutterBottom variant="h5" component="div">Atualizar Comentário</Typography>
                <TextField fullWidth label="Comentário" size="small" variant="outlined" margin="normal" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} id="editedComment" placeholder="Seu comentário" />
                <Button fullWidth variant="contained" onClick={handleEditComment} type="submit">Atualizar</Button>
            </DialogContent>
        </Dialog>
    );
}

export default EditComment;