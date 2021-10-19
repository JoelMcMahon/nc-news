import React, {useEffect, useState} from 'react'
import { getArticle } from '../utils/api'

const ArticleBody = ({article_id}) => {

    const [article, setArticle] = useState({})

    useEffect(() => {
        getArticle(article_id).then((res) => {
            setArticle(res)
        })

    }, [])

    return (
        <div>
            <p>{article}</p>
        </div>
    )
}

export default ArticleBody
