import React from "react"
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard"
import  Login  from "./Login";
import Profile from "./sidebarPages/Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Loans from "./sidebarPages/Loans";
import Payments from "./sidebarPages/Payments";
import Transfers from "./sidebarPages/Transfers";
import ChangePassword from "./ChangePassword";

function App() {
  return(
      <Container className='d-flex align-items-center justify-content-center' style = {{minHeight: "100vh"}}>

          <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/'component={Dashboard}/>
              <PrivateRoute path = '/Home' component={Dashboard}/>
              <PrivateRoute path ='/SignUp' component={Signup}/>
              <PrivateRoute path ='/LogIn' component={Login}/>
              <PrivateRoute path ='/forgot-password' component={ForgotPassword}/>
              <PrivateRoute path ='/profile' component={Profile}/>
              <PrivateRoute path ='/loans' component={Loans}/>
              <PrivateRoute path ='/payments' component={Payments}/>
              <PrivateRoute path ='/transfers' component={Transfers}/>
              <PrivateRoute path ='/ChangePassword' component={ChangePassword}/>

            </Switch>
          </AuthProvider>
          </Router>

      </Container>
  )
}

export default App;
