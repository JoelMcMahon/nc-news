import React, {useEffect, useState} from 'react'
import { getArticle } from '../utils/api'

const ArticleBody = ({article_id}) => {

    const [articleBody, setArticleBody] = useState('')

    useEffect(() => {
        getArticle(article_id).then((res) => {
            setArticleBody(res.body)
        })

    }, [article_id])

    return (
        <div>
            <p>{articleBody}</p>
        </div>
    )
}

export default ArticleBody
