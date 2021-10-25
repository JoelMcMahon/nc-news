import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Dropdown from './utils/Dropdown'
import ArticleBody from './ArticleComponents/ArticleBody'
import { getArticles } from './utils/api'
import { BsSortDown, BsSortUpAlt } from 'react-icons/bs'
import { MdOutlineModeComment, MdThumbUpOffAlt } from 'react-icons/md'

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
                        <div className="main__sort_container">
                            <select className="main__sort_by" onChange={handleOnChange}>
                                <option value="created_at">Date</option>
                                <option value="comment_count">Comments</option>
                                <option value="votes">Votes</option>
                            </select>
                            <button class="main__sort_order" onClick={handleOnClick}>{order ? <BsSortUpAlt /> : <BsSortDown />}</button>
                        </div>
                        <ul>
                            {articles.map((article) => {
                                return (
                                    <>
                                        <li key={article.article_id} className="main__article_li">
                                            <Link className="main__article_title_link" to={`/articles/${article.article_id}`}>
                                                <h2 className="main__article_title">{article.title}</h2>
                                            </Link>
                                            <div className="main__article_tags">
                                                <h3 className="main__author_name">{article.author}</h3>
                                                <Link className="main__topic_tag-link" to={`/articles/topics/${article.topic}`}>
                                                    <button className="main__topic_tag">{article.topic}</button>
                                                </Link>
                                                <p className="main__date">{article.created_at.slice(0, 10)}</p>
                                                <div className="main__article_interactions--dropdown">
                                                    <Link to={`/articles/${article.article_id}`}>
                                                        <p className="main__interaction_indicator"><MdOutlineModeComment className="main__interaction_icon" />{article.comment_count}</p>
                                                    </Link>
                                                    <Link to={`/articles/${article.article_id}`}>
                                                        <p className="main__interaction_indicator"><MdThumbUpOffAlt className="main__interaction_icon" />{article.votes}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Dropdown>
                                                <ArticleBody article_id={article.article_id} />
                                            </Dropdown>
                                        </li>
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
