import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getTopics } from './utils/api'

const Nav = () => {

    const [topics, setTopics] = useState([])

    useEffect(() => {
        getTopics().then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
        
    }, [])
    
    
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/articles">Articles</NavLink>
            {topics.map(({slug}) => {
                let newSlug = slug.charAt(0).toUpperCase() + slug.slice(1)
                return <NavLink key={newSlug} to={`/articles/topics/${newSlug}`}>{newSlug}</NavLink>
            })}
        </div>
    )
}

export default Nav


