import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation"
export default function PrivateRoute({component: Component, ...rest}) {
    const { currentUser } = useAuth()
    console.log(rest)
    return (
        <Route {...rest} render={props => {
            return  currentUser ? <div><Navigation/><Component { ...props} /> </div>: <Redirect to='/login' />
        }}>
        </Route>
    )
}
