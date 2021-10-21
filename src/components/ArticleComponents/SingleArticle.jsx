import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getArticle } from '../utils/api'
import CommentDisplay from './CommentDisplay'



const SingleArticle = ({isLoggedIn, user}) => {

    const [selectedArticle, setSelectedArticle] = useState([])

    const { article_id } = useParams()

    useEffect(() => {
        getArticle(article_id).then((res) => {
            setSelectedArticle(res)
        })
    }, [article_id])

    return (
        <div>
            <h2>{selectedArticle.title}</h2>
            <h3>{selectedArticle.author}</h3>
            <p>{selectedArticle.created_at}</p>
            <p>{selectedArticle.topic}</p>
            <p>Comments {selectedArticle.comment_count}</p>
            <p>Votes {selectedArticle.votes}</p>
            <p>{selectedArticle.body}</p>
            <button>Votes {selectedArticle.votes}</button>            
            <CommentDisplay id="comment_display" article_id={article_id} isLoggedIn={isLoggedIn} user={user}/> 

        </div>
    )
}

export default SingleArticle
