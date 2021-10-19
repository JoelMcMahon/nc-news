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
                            <Link to={`/articles/${article.article_id}`}>
                                <li key={article.article_id}>
                                    <p>{article.title}</p>
                                    <p>{article.author}</p>
                                    <p>{article.created_at}</p>
                                    <p>{article.topic}</p>
                                    <p>Votes {article.votes}</p>
                                </li>
                            </Link>
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
