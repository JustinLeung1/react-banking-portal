import React, { Component } from 'react'
import "../../styles/Sidebar.css"
import {SidebarData} from "./SidebarData"
import { useHistory } from "react-router-dom"
import logo from '../../images/chips-logo.png'

import PropTypes from 'prop-types';
import { useAuth } from "../../contexts/AuthContext"
import { connect } from 'react-redux'
import {logoutUser} from '../../redux/actions/userAction'
class Sidebar extends Component{
    // const history = useHistory()
    // const [error, setError] = useState("")
    // const {currentUser, logout} = useAuth()

    handleLogout = () => {
        this.props.logoutUser();
    }
    render(){
        const {
            classes,
            user: {
              credentials: { email },
              loading,
              authenticated
            }
        } = this.props;
        console.log(this.props)
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
                <li className="row" onClick={this.handleLogout}> Log Out</li>
            </ul>
        </div>
    );
}
}

const mapStateToProps = (state) => ({
    user: state.user
  });

  Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

export default connect(mapStateToProps, {logoutUser})(Sidebar);