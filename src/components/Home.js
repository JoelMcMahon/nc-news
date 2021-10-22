import React, { useEffect, useState } from 'react'
import ArticleBody from './ArticleComponents/ArticleBody';
import { getArticles } from './utils/api'
import { Link } from 'react-router-dom';


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
                        <h2>Latest News</h2>
                        <ul>
                            {recentArticles.map((article) => {
                                return (
                                    <li key={article.article_id}>
                                        <Link to={`/articles/${article.article_id}`}>
                                            <h2>{article.title}</h2>
                                        </Link>
                                        <h3>{article.author}</h3>
                                        <p>{article.created_at}</p>
                                        <p>{article.topic}</p>
                                        <p>Votes {article.votes}</p>
                                        <ArticleBody article_id={article.article_id} />
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


