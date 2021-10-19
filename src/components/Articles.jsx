import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { getArticles } from './utils/api'

const Articles = ({articles, setArticles}) => {

    const {topic} = useParams()

    useEffect(() => {
        getArticles(topic).then((res) => {
            setArticles(res)
        })
    })
    return (
        <div>
            <p>{articles.map((article) => {
                return article.title
            })}</p>
        </div>
    )
}

export default Articles
