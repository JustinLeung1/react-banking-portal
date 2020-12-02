import React, { Component} from "react"
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
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from '../redux/store';
import axios from 'axios';

import { SET_AUTHENTICATED } from '../redux/types';
import { logoutUser, getUserData} from '../redux/actions/userAction';





axios.defaults.baseURL ='https://us-central1-bankingapp-4f093.cloudfunctions.net/api';

//axios.defaults.baseURL = 'http://localhost:5000/bankingapp-4f093/us-central1/api';
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


class App extends Component {
  render(){
  return(
      <Container className='d-flex align-items-center justify-content-center' style = {{minHeight: "100vh"}}>
        <Provider store={store}>
          <Router>
            <Switch>
              {/*Logged in routes */}
              <PrivateRoute exact path='/'component={Dashboard}/>
              <PrivateRoute path = '/Home' component={Dashboard}/>
              <PrivateRoute path ='/profile' component={Profile}/>
              <PrivateRoute path ='/loans' component={Loans}/>
              <PrivateRoute path ='/payments' component={Payments}/>
              <PrivateRoute path ='/transfers' component={Transfers}/>
              <PrivateRoute path ='/ChangePassword' component={ChangePassword}/>
              {/*Logged out routes */}
              <Route path ='/SignUp' component={Signup}/>
              <Route path ='/LogIn' component={Login}/>
              <Route path ='/forgot-password' component={ForgotPassword}/>
              
            </Switch>
          </Router>

          </Provider>
      </Container>
  );
  }
  }

export default App;
