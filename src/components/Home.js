import React, { useEffect, useState } from 'react'
import ArticleBody from './ArticleComponents/ArticleBody';
import { getArticles } from './utils/api'
import { Link } from 'react-router-dom';
import { MdOutlineModeComment, MdThumbUpOffAlt } from 'react-icons/md'


const Home = ({ articles, setArticles }) => {

    const [isError, setIsError] = useState(false)


    useEffect(() => {
        setIsError(false)
        getArticles().then((res) => {
            setArticles(res)
        })
            .catch((err) => {
                setIsError(true)
            })

    }, [])

    const recentArticles = [...articles].slice(0, 3);

    return (
        <div>

            {
                (isError ?

                    <p>Oops! Something went wrong... Try again!</p>

                    :
                    <>
                        <h2 className="main__subheader">Latest News</h2>
                        <ul>
                            {recentArticles.map((article) => {
                                return (
                                    <li key={article.article_id} className="main__article_li">
                                        <Link className="main__article_title_link" to={`/articles/${article.article_id}`}>
                                            <h2 className="main__article_title">{article.title}</h2>
                                        </Link>
                                        <div className="main__article_tags">
                                            <h3 className="main__author_name">{article.author}</h3>
                                            <Link className="main__topic_tag-link" to={`/articles/topics/${article.topic}`}>
                                                <button className="main__topic_tag">{article.topic}</button>
                                            </Link>
                                        </div>
                                        <ArticleBody article_id={article.article_id} />
                                        <div className="main__article_interactions">
                                            <Link to={`/articles/${article.article_id}`}>
                                                <p className="main__interaction_indicator"><MdOutlineModeComment className="main__interaction_icon" />{article.comment_count}</p>
                                            </Link>
                                            <Link to={`/articles/${article.article_id}`}>
                                                <p className="main__interaction_indicator"><MdThumbUpOffAlt className="main__interaction_icon" />{article.votes}</p>
                                            </Link>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}
        </div>
    )
}

export default Home


