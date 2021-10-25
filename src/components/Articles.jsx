import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Dropdown from './utils/Dropdown'
import ArticleBody from './ArticleComponents/ArticleBody'
import { getArticles } from './utils/api'
import { BsSortDown, BsSortUpAlt } from 'react-icons/bs'

const Articles = ({ articles, setArticles }) => {

    const [sort, setSort] = useState('created_at')
    const [order, setOrder] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleOnChange = (e) => {
        setSort(e.target.value)
    }


    const handleOnClick = (e) => {
        setOrder((currentOrder) => {
            setOrder(!currentOrder)
        })
    }

    const { topic } = useParams()

    useEffect(() => {
        setIsError(false)
        getArticles(topic, sort, order)
            .then((res) => {
                setArticles(res)
            })
            .catch((err) => {
                setIsError(true)
            })
    }, [topic, sort, order])

    let subheader = (topic ? `${topic}` : 'All Articles')


    return (

        <div>
            {
                (isError ?

                    <p>Oops! Something went wrong... Try again!</p>

                    :
                    <>
                        <h2 className="main__subheader">{subheader}</h2>
                        <select onChange={handleOnChange}>
                            <option value="created_at">Date</option>
                            <option value="comment_count">Comments</option>
                            <option value="votes">Votes</option>
                        </select>
                        <button onClick={handleOnClick}>{order ? <BsSortUpAlt /> : <BsSortDown />}</button>

                        <ul>
                            {articles.map((article) => {
                                return (
                                    <>
                                        <li key={article.article_id}>
                                            <Link to={`/articles/${article.article_id}`}>
                                                <h2>{article.title}</h2>
                                            </Link>
                                            <h3>{article.author}</h3>
                                            <p>{article.created_at}</p>
                                            <p>{article.topic}</p>
                                            <p>Votes {article.votes}</p>
                                            <p>Comments {article.comment_count}</p>
                                        </li>
                                        <Dropdown>
                                            <ArticleBody article_id={article.article_id} />
                                        </Dropdown>
                                    </>
                                )
                            })}
                        </ul>
                    </>
                )}
        </div>

    )
}

export default Articles
