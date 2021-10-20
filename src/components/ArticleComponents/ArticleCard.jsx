import React, {useState} from 'react'
import Dropdown from '../utils/Dropdown'
import ArticleBody from './ArticleBody'
import { Link } from 'react-router-dom'

const ArticleCard = ({ articles }) => {

     const [sort, setSort] = useState('created_at')
     const [order, setOrder] = useState(true)

     const handleOnChange = (e) => {
         setSort(e.target.value)
     }

     console.log(sort)

     const handleOnClick = (e) => {
        setOrder((currentOrder) => {
            setOrder(!currentOrder)
        })
     }
     console.log(order)

   
     

    return (
        <div>
            <select onChange={handleOnChange}>
                <option value="" selected="selected">Sort By</option>
                <option value="created_at">Date</option>
                <option value="comment_count">Number of Comments</option>
                <option value="votes">Votes</option>
            </select>
            <button onClick={handleOnClick}>{order ? 'Down Arrow' : 'Up Arrow'}</button>
            
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
