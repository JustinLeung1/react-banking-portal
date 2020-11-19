import React, { useState} from 'react'
import "../../styles/Sidebar.css"
import {SidebarData} from "./SidebarData"
import { useHistory } from "react-router-dom"
import logo from '../../images/chips-logo.png'
import { useAuth } from "../../contexts/AuthContext"
function Sidebar() {
    const history = useHistory()
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()

    async function handleLogout(){
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch (error) {
            setError("Failed to log out")
        }
    }

    return (
        //sidebar composed of profile image, welcome message, and list of
        //pages to visit
        //fill in onClick{} to add function to the buttons
        <div className="Sidebar">
            <img className="SidebarImage" src={logo} alt="logo"></img>
            <h2 className="SidebarGreeting">Welcome, User</h2>
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li 
                        key={key} 
                        className="row"
                        onClick={()=> {window.location.pathname = val.link}}
                        >
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
                <li className="row" onClick={handleLogout}> Log Out</li>
            </ul>
        </div>
    );
}

export default Sidebar