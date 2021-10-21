import React, { useEffect } from 'react'
import ArticleBody from './ArticleComponents/ArticleBody';
import { getArticles } from './utils/api'
import { Link } from 'react-router-dom';


const Home = ({ articles, setArticles }) => {


    useEffect(() => {
        getArticles().then((res) => {
            setArticles(res)
        })

    }, [])

    const recentArticles = [...articles].slice(-3);

    return (
        <div>
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
        </div>
    )
}

export default Home


