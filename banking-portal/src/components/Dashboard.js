import React, { useState} from "react"
import { Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

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
        <div style={{minWidth:"1000px", minHeight:"100vh"}}> 

                <h2 className="text-left mb-4 ">Profile</h2>
                {error && <Alert variant ="danger"></Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>

            
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>

            
        </div>
        
    )
}
