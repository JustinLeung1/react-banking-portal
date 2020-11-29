import React, {Component} from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap'
//import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

// new stuff from other video

import PropTypes from 'prop-types';


class Login extends Component {

    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
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
        const userData = { 
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
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
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={loading}className="w-100" type="submit">
                            Log in
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password"> Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an Account? <Link to="/Signup">Sign Up</Link>
            </div>
        </div>
    );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login);