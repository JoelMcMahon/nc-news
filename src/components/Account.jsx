import React, {useState, useEffect } from 'react'
import { getUsers } from './utils/api'

const Account = ({isLoggedIn, setUser, setIsLoggedIn}) => {

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
       
       if(exists) {
           setIsValidUsername(true)
           setUsernameMessage('Bingo!') 

       } else {
           setIsValidUsername(false)
           setUsernameMessage('Please enter a valid username') 
       }
   })
}, [username])

//Not ideal to have a request made on each keystroke - make a request for userList on page load?



    return (
        <div>
            {!isLoggedIn ? 
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
            placeholder="New User? try cooljmessy"
            id="username" 
            type="text" 
            value={username}
            required
            onChange={handleOnChange}
              />
            <button disabled={!isValidUsername}>Log In</button>
            <p>{usernameMessage}</p>
        </form>
       : null }
        </div>
    )
}

export default Account
