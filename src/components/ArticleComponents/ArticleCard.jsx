import React from 'react'
import Dropdown from '../utils/Dropdown'
import ArticleBody from './ArticleBody'
import { Link } from 'react-router-dom'

const ArticleCard = ({ articles }) => {

    return (
        <div>
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
                            </li>
                            <Dropdown>
                                <ArticleBody article_id={article.article_id} />
                            </Dropdown>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}

export default ArticleCard
