import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: 'https://nc-news-app-21.herokuapp.com/api'
});

export const getArticles = (topic, sort, order) => {
    const sortOrder = (order ? 'ASC' : 'DESC')
    return ncNewsApi.get('/articles', {params: {topic: topic, sort_by: sort, order: sortOrder}})
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

export const getUsers = () => {
    return ncNewsApi.get('/users')
    .then((res) => {
        return res.data.users;
    })
}

export const postComment = (article_id, user, commentBody) => {
    return ncNewsApi.post(`/articles/${article_id}/comments`, {
        username: user,
        body: commentBody
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

export const addVotes = (article_id, num) => {
    return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: num })
    .then((res) => {
        console.log(res.data.article[0].votes)
    }).catch((err) => {
        console.log(err)
    })
}