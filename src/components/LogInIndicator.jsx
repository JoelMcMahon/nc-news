import React from 'react'
import {Link} from 'react-router-dom'

const LogInIndicator = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {

    const handleOnClick = (e) => {
        if (isLoggedIn) {
            setIsLoggedIn(false)
            setUser({})
        }
    }

    console.log(user)
    return (
        <div>
            <Link to="/account">
                {isLoggedIn && `Welcome, ${user}!`} 
                <button onClick={handleOnClick}>{isLoggedIn ? "Log Out" : "Log In"}</button>
            </Link>
        </div>
    )
}

export default LogInIndicator

//Build logIn indicator that allows people to log in as default user.
