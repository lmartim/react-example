import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, } from "@mui/material"
import { Edit, Delete } from '@mui/icons-material';

import EditPost from '../../components/Posts/EditPost';
import CommentsList from '../../components/Comments/CommentsList'

import FakerApi from '../../services/fake-api/fakerApi'

interface IComments {
    comment: String
}

interface IData {
    comments: IComments[],
    content: String,
    id: Number,
    title: String,
    user_id: Number
}

interface IPost {
    data?: IData,
    success?: Boolean
}

function Post() {
    const user = JSON.parse(localStorage.getItem("auth"))
    const fakerApi = new FakerApi()

    const navigate = useNavigate()

    let { postId } = useParams()
    const [post, setPost] = useState<IPost>({ data: null, success: false });
    const [fetchPost, setFetchPost] = useState(true);
    const [editPost, setEditPost] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data: IPost = await fakerApi.get('/posts/view', {
                post_id: parseInt(postId)
            })

            setPost(data)
        }

        if (setFetchPost) {
            fetchData()
            setFetchPost(false)
        }
    }, [fetchPost])


    async function DeleteComment() {
        await fakerApi.post('/posts/remove', {
            post_id: parseInt(postId)
        })
            .then(response => {
                console.log(response)
                navigate("/posts")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <Card sx={{ marginBottom: 5 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post?.data?.title ? post.data.title : '(sem título)'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post?.data?.content}
                    </Typography>
                    {
                        post?.data?.user_id === user.id &&
                        <Box sx={{ mt: 1, fontSize: 2 }}>
                            <Edit fontSize="small" color="primary" sx={{ cursor: 'pointer', mr: 1 }} onClick={() => setEditPost(true)} />
                            <Delete fontSize="small" color="primary" sx={{ cursor: 'pointer' }} onClick={() => DeleteComment()} />
                            <EditPost postId={post.data.id} open={editPost} setFetchPost={setFetchPost} setEditPost={setEditPost} />
                        </Box>
                    }
                </CardContent>
            </Card>
            <CommentsList userId={post?.data?.user_id} postId={post?.data?.id} />
        </div>
    );
}

export default Post;