import React, { useState, useEffect } from 'react'
import { getComments } from '../utils/api'

const CommentDisplay = ({ article_id }) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(article_id).then((res) => {
            setComments(res)
        })
    }, [article_id])


    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => {
                    return <li>
                        <h3>{comment.author}</h3>
                        <p>{comment.created_at}</p>
                        <p>{comment.body}</p>
                        <button>Votes {comment.votes}</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CommentDisplay
