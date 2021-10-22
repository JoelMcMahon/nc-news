import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div>
            <p>Oops! Something went wrong... Try again!</p>
            <button><Link to="/Home">Home</Link></button>
        </div>
    )
}

export default Error
