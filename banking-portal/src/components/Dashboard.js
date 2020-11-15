import React, { useState} from "react"
import { Alert, Button, Container, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../styles/Dashboard.css"
import Sidebar from "./dashboardcomponents/Sidebar"
import Home from "./dashboardcomponents/Home"

export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    
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

        //creates dashboard page with one column of the sidebar
        //and the other with selected page information

        //replace code in second column to eventually shift between pages on the dashboard

        //need to resize width of sidebar, currently allocated half the page

        <div className="Dashboard">
        <Container fluid>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <Home/>
                </Col>
            </Row>
        </Container>
        </div>
        

        /*
        //previous code

        <div style={{minWidth:"2000px", minHeight:"100vh"}}> 

                <h2 className="text-left mb-4 ">Profile</h2>
                {error && <Alert variant ="danger"></Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>

            
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>

            
        </div>
        */
        
    )
}
