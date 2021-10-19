import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ArticleCard from './ArticleComponents/ArticleCard'
import { getArticles } from './utils/api'

const Articles = ({articles, setArticles}) => {

    const {topic, article_id} = useParams()

    console.log(useParams())

    useEffect(() => {
        getArticles(topic, article_id).then((res) => {
            setArticles(res)
        })
    }, [topic, article_id])

    console.log(articles)
    return (
        <div>
            <ArticleCard articles={articles} setArticles={setArticles}/>
        </div>
    )
}

export default Articles
