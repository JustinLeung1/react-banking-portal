import React from "react"
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard"
import  Login  from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";

function App() {
  return(
      <Container className='d-flex align-items-center justify-content-center' style = {{minHeight: "100vh"}}> 

          <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/'component={Dashboard}/>
              <Route path ='/SignUp' component={Signup}/>
              <Route path ='/LogIn' component={Login}/>
              <Route path ='/forgot-password' component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
          </Router>

      </Container>
  )
}

export default App;
