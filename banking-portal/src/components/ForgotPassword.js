import React, {Component, } from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { forgetPassword } from '../redux/actions/userAction';

// new stuff from other video

import PropTypes from 'prop-types';

class   ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
          email: '',
          errors: {}
        };
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }

    handleSubmit = (e) =>{
        e.preventDefault();
        const forgetPasswordData = { 
            email: this.state.email,
        };
        this.props.forgetPassword(forgetPasswordData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    render() { 
        const {
            UI: { loading }
          } = this.props;
          const { errors } = this.state;
                return (
                    <div className="w-100" style={{maxWidth:"400px"}}>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Password Reset</h2>
                                {errors.general && <Alert variant="danger">{errors.general}</Alert>}
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>                        
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100" type="submit">
                                        Reset Password
                                    </Button>
                                </Form>
                                <div className="w-100 text-center mt-3">
                                    <Link to="/login"> Log In</Link>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Need an Account? <Link to="/Signup">Sign Up</Link>
                        </div>
                    </div>
                )
            }
    }

    ForgotPassword.propTypes = {
        forgetPassword: PropTypes.func.isRequired,
        UI: PropTypes.object.isRequired
    }
    
    const mapStateToProps = (state) => ({
        user:state.user,
        UI: state.UI
    });
    
    const mapActionsToProps = {
        forgetPassword
    }


    export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);