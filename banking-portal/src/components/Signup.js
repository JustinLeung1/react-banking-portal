import React,{ Component} from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap'
//import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
//Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';

// new stuff from other video

import PropTypes from 'prop-types';

class Signup extends Component {


    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errors:{}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
          });
          const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
          };
          this.props.signupUser(newUserData, this.props.history);
      };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

    render(){
        const {
            classes,
            UI: { loading }
          } = this.props;
          const { errors } = this.state;
    
        return (
            <div className="w-100" style={{maxWidth:"400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {errors.general && <Alert variant="danger">{errors.general}</Alert>}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>                        
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password}  onChange={this.handleChange} required/>                        
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword}  onChange={this.handleChange}required/>                        
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an Account? <Link to="LogIn">Log In</Link>
                </div>
            </div>
        )
    }
}


Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  export default connect(
    mapStateToProps,
    { signupUser }
  )(Signup);
  