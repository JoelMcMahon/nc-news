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
            <NavLink activeClassName="selected" className="NavLink"  exact to="/Home">Home</NavLink>
            <NavLink activeClassName="selected" className="NavLink" exact to="/articles">Articles</NavLink>
            {topics.map(({slug}) => {
                let newSlug = slug.charAt(0).toUpperCase() + slug.slice(1)
                return <NavLink key={slug} activeClassName="selected" className="NavLink" exact to={`/articles/topics/${slug}`}>{newSlug}</NavLink>
            })}
        </div>
    )
}

export default Nav


