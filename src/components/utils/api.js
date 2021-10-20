import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: 'https://nc-news-app-21.herokuapp.com/api'
});

export const getArticles = (topic) => {
    return ncNewsApi.get('/articles', {params: {topic: topic}})
        .then((res) => {
            return res.data.articles
        })
}

export const getArticle = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`)
    .then((res) => {
        return res.data.article[0];
    })
}

export const getTopics = () => {
    return ncNewsApi.get('/topics')
        .then((res) => {
            return res.data.topics
        })
}

export const getComments = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`)
    .then((res) => {
        return res.data.comments
    })
}