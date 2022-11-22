import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material"

import FakerApi from '../../services/fake-api/fakerApi'
import TextSummarizer from '../../services/TextSummarizer';

interface IData {
    content: String,
    id: Number,
    title: String,
    user_id: Number
}

interface IPosts {
    data?: IData[],
    success?: Boolean
}

function Posts() {
    const fakerApi = new FakerApi()

    const [posts, setPosts] = useState<IPosts>({ data: [], success: false });

    useEffect(() => {
        const fetchData = async () => {
            const data: IPosts = await fakerApi.post('/posts', {})

            setPosts(data)
        }

        fetchData();
    }, [])

    return (
        <div>
            {posts?.data?.map((post, index) => {
                return (
                    <Link to={`/posts/${post.id}`} key={index} style={{ textDecoration: 'none' }}>
                        <Card sx={{ marginBottom: 5 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title ? post.title : '(sem título)'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {TextSummarizer(post.content)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    );
}

export default Posts