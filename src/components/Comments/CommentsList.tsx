import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material'

import Comment from './Comment'
import CreateComment from './CreateComment';

import FakerApi from '../../services/fake-api/fakerApi'

const fakerApi = new FakerApi()

interface IComment {
    content: String,
    id: Number,
    user_id: Number
}

interface IComments {
    data?: IComment[],
    success?: Boolean
}

function ShowComments({ postId, comments, setFetchComments }) {
    return (
        comments.map((comment, index) => {
            return (
                <Comment key={index} postId={postId} comment={comment} setFetchComments={setFetchComments} />
            )
        })
    )
}

function NoCommentFound() {
    return (
        <div>Nenhum comentário foi feito (ainda).</div>
    )
}

function CommentsList({ userId, postId }) {
    const user = JSON.parse(localStorage.getItem("auth"))

    const [fetchComments, setFetchComments] = useState(true);
    const [comments, setComments] = useState<IComments>({ data: [], success: false });

    useEffect(() => {
        const fetchData = async () => {
            const data: IComments = await fakerApi.get('/comments', {
                post_id: postId
            })

            setComments(data)
        }

        if (fetchComments && postId) {
            fetchData();
            setFetchComments(false);
        }
    }, [fetchComments, postId])

    let componentToShow = <></>
    if (comments?.data?.length > 0) {
        componentToShow = <ShowComments postId={postId} comments={comments.data} setFetchComments={setFetchComments} />
    } else {
        componentToShow = <NoCommentFound />
    }

    return (
        <div className="comments-list">
            <Typography gutterBottom variant="h5" component="div">Comentários</Typography>
            <hr />
            {
                user.id === userId
                    ? <><CreateComment setFetchComments={setFetchComments} /> <hr /></>
                    : null
            }
            {fetchComments ? <div>Buscando...</div> : componentToShow}
        </div>
    );
}

export default CommentsList;