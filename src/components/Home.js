import React, { useEffect } from 'react'
import ArticleBody from './ArticleComponents/ArticleBody';
import { getArticles } from './utils/api'


const Home = ({ articles, setArticles }) => {

    
    useEffect(() => {
        getArticles().then((res) => {
            console.log(res)
            setArticles(res)
        })
        
    }, [])
    
    const recentArticles = [...articles].slice(0, 3);

    return (
        <div>
            <h2>Home</h2>
            <ul>
                {recentArticles.map((article) => {
                    return (
                    <li key={article.article_id}>
                        <p>{article.title}</p>
                        <p>{article.author}</p>
                        <p>{article.created_at}</p>
                        <p>{article.topic}</p>
                        <p>Votes {article.votes}</p>
                        <ArticleBody article_id={article.article_id}/>
                    </li>
                )})}
            </ul>
        </div>
    )
}

export default Home


