import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material'

import FakerApi from '../../services/fake-api/fakerApi'

function CreateComment({ setFetchComments }) {
    const fakerApi = new FakerApi()

    let { postId } = useParams()

    const [content, setContent] = useState("");

    const handleSubmitComment = () => {
        const comment = async () => (fakerApi.post('/comments/create', {
            post_id: parseInt(postId),
            comment: {
                content
            }
        }))

        comment()
            .then(response => {
                console.log(response)
                setFetchComments(true);
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <TextField id="content" label="Novo Comentário" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Conteúdo do novo comentário" fullWidth />
            <Button fullWidth variant="contained" onClick={handleSubmitComment} type="submit" sx={{ mt: 1 }}>Comentar</Button>
        </>
    );
}

export default CreateComment;