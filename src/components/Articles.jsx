import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ArticleCard from './ArticleComponents/ArticleCard'
import { getArticles } from './utils/api'

const Articles = ({articles, setArticles}) => {

    const {topic} = useParams()

    useEffect(() => {
        getArticles(topic).then((res) => {
            setArticles(res)
        })
    }, [topic])

    return (
        <div>
            <ArticleCard articles={articles} setArticles={setArticles}/>
        </div>
    )
}

export default Articles
