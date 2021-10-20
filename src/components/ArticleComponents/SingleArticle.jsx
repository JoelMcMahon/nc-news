import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getArticle } from '../utils/api'
import CommentDisplay from './CommentDisplay'



const SingleArticle = () => {

    const [selectedArticle, setSelectedArticle] = useState([])

    const { article_id } = useParams()

    useEffect(() => {
        getArticle(article_id).then((res) => {
            console.log(res)
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
            <button>Comments {selectedArticle.comment_count}</button>
            <button>Votes {selectedArticle.votes}</button>
            <CommentDisplay id="comment_display" article_id={article_id}/> 
        </div>
    )
}

export default SingleArticle
