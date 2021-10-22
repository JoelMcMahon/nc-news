import React, { useState, useEffect } from 'react'
import { postComment, getComments } from '../utils/api'

const CommentDisplay = ({ article_id, isLoggedIn, user }) => {

    const [comments, setComments] = useState([])
    const [commentBody, setCommentBody] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsError(false)
        getComments(article_id).then((res) => {
            setComments(res)
        })
        .catch((err) => {
            setIsError(true)
        })
    }, [article_id, commentBody])


    const handleOnSubmit = (e) => {
        e.preventDefault()
        // setComments((currentComments) => {
        //     const newCommentList = [...currentComments, ]
        // })
        postComment(article_id, user, commentBody).then((res) => {
            console.log(res)
        })
        setCommentBody('');
        
    }


    //Work out how to rerender the commentDisplay after a comment has been posted -
    //Including commentBody state in dependency array of useEffect doesn't seem to work
    //Possibly try to optimistically render the comment? Date could be a problem..

    



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
