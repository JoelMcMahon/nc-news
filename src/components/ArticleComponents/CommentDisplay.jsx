import React, { useState, useEffect } from 'react'
import { postComment, getComments } from '../utils/api'

const CommentDisplay = ({ article_id, isLoggedIn, user }) => {

    const [comments, setComments] = useState([])
    const [commentBody, setCommentBody] = useState("")

    useEffect(() => {
        getComments(article_id).then((res) => {
            setComments(res)
        })
    }, [article_id, commentBody])


    const handleOnSubmit = (e) => {
        e.preventDefault()
        postComment(article_id, user, commentBody).then((res) => {
            console.log(res)
        })
        setCommentBody('');
        
    }

    



    const handleOnChange = (e) => {
        setCommentBody(e.target.value)
    }



    return (
        <div>
            <h2>Comments ({comments.length})</h2>
            {isLoggedIn &&
                <form onSubmit={handleOnSubmit}>
                    <label htmlFor="commentBody">Comment as {user}:</label>
                    <input
                        type="text"
                        size="20"
                        required
                        value={commentBody}
                        onChange={handleOnChange}
                    />
                    <button>Post Comment</button>
                </form>
            }

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
