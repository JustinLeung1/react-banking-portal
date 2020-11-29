import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation"

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
    return (
    <Route
    {...rest}
    render={(props) =>{
       return authenticated === false ? <Redirect  to="/login"/> : <Component {...props} />
    }
    }
  />
  );
}

// export default function PrivateRoute({component: Component, ...rest}) {
//     const { currentUser } = useAuth()
//     console.log(rest)
//     return (
//         <Route {...rest} render={props => {
//             return  currentUser ? <div><Component { ...props} /> </div>: <Redirect to='/login' />
//         }}>
//         </Route>
        
//     )
// }
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });
  
  PrivateRoute.propTypes = {
    user: PropTypes.object
  };
export default connect(mapStateToProps)(PrivateRoute);
