import React, {useState} from 'react'
 

const Dropdown = ({children}) => {
    const [isDown, setIsDown] = useState(false)

const toggleDropdown = () => {
    setIsDown((isDown) => {
        return !isDown;
    })
}

    return (
        <div>
            {isDown && children}
            <button onClick={toggleDropdown}>
                {isDown ? 'Hide' : 'Show Full Article'}
            </button>
        </div>
    )
}

export default Dropdown
