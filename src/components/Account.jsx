import React, { useState, useEffect } from 'react'
import { getUsers } from './utils/api'

const Account = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {

    const [username, setUsername] = useState('')
    const [userList, setUserList] = useState([])
    const [isValidUsername, setIsValidUsername] = useState(false)
    const [usernameMessage, setUsernameMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoggedIn(true)
        setUser(username)
        console.log(username)
    }

    const handleOnChange = (e) => {
        setUsername(e.target.value)

    }

    useEffect(() => {
        getUsers().then((res) => {
            const exists = res.find((user) => {
                return user.username === username
            })

            if (exists) {
                setIsValidUsername(true)
                setUsernameMessage('Username found')

            } else {
                setIsValidUsername(false)
                setUsernameMessage('Please enter a valid username')
            }
        })
    }, [username])

    //Not ideal to have a request made on each keystroke - make a request for userList on page load?



    return (
        <div>
            <h2 className="main__subheader">Account</h2>

            {!isLoggedIn ?
                <div className="main__form-container">
                    <form className="main__login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username: </label>
                        <input
                            className="main__username"
                            placeholder="Try cooljmessy"
                            id="username"
                            type="text"
                            value={username}
                            required
                            onChange={handleOnChange}
                        />
                        <button className="main__login-form-button" disabled={!isValidUsername}>Log In</button>
                        <p className="main__username-message">{usernameMessage}</p>
                    </form>
                </div>
                :
                <div className="main__form-container">
                    <p className="main__username-message">Welcome, {user}!</p>
                </div>
            }
        </div>
    )
}

export default Account
