import React from 'react'
import "../../styles/Sidebar.css"
import {SidebarData} from "./SidebarData"
import logo from '../../images/chips-logo.png'

function Sidebar() {
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
            </ul>
        </div>
    );
}

export default Sidebar