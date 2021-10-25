import React, {useState} from 'react'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'
 

const Dropdown = ({children}) => {
    const [isDown, setIsDown] = useState(false)

const toggleDropdown = () => {
    setIsDown((isDown) => {
        return !isDown;
    })
}

    return (
        <div className="main__dropdown_container">
            {isDown && children}
            <button className="main__dropdown_arrow" onClick={toggleDropdown}>
                {isDown ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
            </button>
        </div>
    )
} 

export default Dropdown
