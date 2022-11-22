import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material"
import { Edit, Delete } from '@mui/icons-material';

import EditComment from './EditComment';

import FakerApi from '../../services/fake-api/fakerApi'

function Comment({ postId, comment, setFetchComments }) {
    const user = JSON.parse(localStorage.getItem("auth"))
    const fakerApi = new FakerApi()

    const [editComment, setEditComment] = useState(false);

    async function DeleteComment() {
        await fakerApi.post('/comments/remove', {
            post_id: parseInt(postId),
            comment_id: parseInt(comment.id)
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        setFetchComments(true);
    }

    return (
        <Card sx={{ marginBottom: 5 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{comment.content}</Typography>
                {
                    user.id === comment.user_id &&
                    <Box sx={{ mt: 1, fontSize: 2 }}>
                        <Edit fontSize="small" color="primary" sx={{ cursor: 'pointer', mr: 1 }} onClick={() => setEditComment(true)} />
                        <Delete fontSize="small" color="primary" sx={{ cursor: 'pointer' }} onClick={() => DeleteComment()} />
                        <EditComment commentId={comment.id} postId={postId} open={editComment} setFetchComments={setFetchComments} setEditComment={setEditComment} />
                    </Box>
                }
            </CardContent>
        </Card>
    )
}

export default Comment