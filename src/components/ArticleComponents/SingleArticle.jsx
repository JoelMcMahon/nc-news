import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { addVotes, getArticle } from '../utils/api'
import CommentDisplay from './CommentDisplay'
import { BiUpvote, BiDownvote } from 'react-icons/bi'



const SingleArticle = ({ isLoggedIn, user }) => {

    const [selectedArticle, setSelectedArticle] = useState([])
    const [voteChange, setVoteChange] = useState(0)

    const { article_id } = useParams()

    useEffect(() => {
        getArticle(article_id).then((res) => {
            setSelectedArticle(res)
        })
    }, [article_id])

    const incVote = (e) => {
        let num = (e.currentTarget.value === "upvote" ? 1 : -1)
        setVoteChange((currVoteChange) => currVoteChange + num)
        addVotes(article_id, num)
    }
    console.log(voteChange)

    return (
        <div>
            <h2>{selectedArticle.title}</h2>
            <h3>{selectedArticle.author}</h3>
            <p>{selectedArticle.created_at}</p>
            <p>{selectedArticle.topic}</p>
            <p>Comments {selectedArticle.comment_count}</p>
            <p>{selectedArticle.body}</p>
            <p>Votes {selectedArticle.votes + voteChange}</p>

            {isLoggedIn &&
                <>
                    <button onClick={incVote} value="upvote"><span><BiUpvote /></span></button>
                    <button onClick={incVote} value="downvote"><BiDownvote /></button>
                </>
            }

            <CommentDisplay id="comment_display" article_id={article_id} isLoggedIn={isLoggedIn} user={user} />

        </div>
    )
}

export default SingleArticle
