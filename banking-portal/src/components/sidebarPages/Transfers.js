import React, {Component} from "react"
import {Button,Alert, Dropdown, Form, DropdownButton, InputGroup, FormControl, Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"
import DropdownItem from "react-bootstrap/esm/DropdownItem"
import { transfer } from '../../redux/actions/dataActions'

//Redux stuff
import { connect } from 'react-redux';

// new stuff from other video

import PropTypes from 'prop-types';


class Transfers extends Component {
    constructor(){
        super();
        this.state = {
            errors:{},
            toAccount:"",
            fromAccount:"",
            amount:0.00,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      };
      handleSubmit = (e) =>{
        e.preventDefault();
        const transferData = { 
            From: this.state.fromAccount,
            To:this.state.toAccount,
            Amount:this.state.amount
        };
        this.props.transfer(transferData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

    render(){
        const {
            classes,
            UI: { loading },
            user: {accounts}
          } = this.props;

          if (accounts){
            this.state.fromAccount = (this.props.user.accounts[0].AccountID)
            };
          const { errors } = this.state;
    return (
        <div className="Dashboard">
            <Container fluid>
                <Row>
                    <Col md={1}>
                        <Sidebar/>
                    </Col>

                    <Col>
                        <div className="Content">
                            <Card className="Tile">
                                <Card.Body className="TileHead">
                                    <h2>Transfers</h2>
                                </Card.Body>
                            </Card>


                            {/* 
                                CARD FOR INTERNAL TRANSFERS

                                "internalTransferSource"    value returns "default", "checkingAccount", "savingsAccoung", or "moneyMarketAccount"
                                "internalTransferAccountId" value returns Id entered of external user
                                "internalTransferAmount"    value returns the amount to be transfered
                            
                                upon hitting "Transfer Funds", do logic to calculate if account selected has required funds to transfer money
                            */}


                            <Card className="Tile">
                                <Card.Body className="TileBody">
                                    <h4>Internal Transfer</h4>
                                    <br></br>

                                    <Form>
                                        <Form.Group as={Row} controlId="formHorizontalInternalSource">
                                            <Form.Label column sm={2}>
                                                From Account
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                as="select"
                                                id="internalTransferSource"
                                                size="lg"
                                                custom
                                                >
                                                    <option value="default">---Select an Account:---</option>
                                                    <option value="checkingAccount">Checking Account</option>
                                                    <option value="savingsAccount">Savings Account</option>
                                                    <option value="moneyMarketAccount">Money Market Account</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formHorizontalInternalDestination">
                                            <Form.Label column sm={2}>
                                                To Account
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                as="select"
                                                id="internalTransferDestination"
                                                size="lg"
                                                placeholder="Select Account"
                                                custom
                                                >
                                                    <option value="default">---Select an Account:---</option>
                                                    <option value="checkingAccount">Checking Account</option>
                                                    <option value="savingsAccount">Savings Account</option>
                                                    <option value="moneyMarketAccount">Money Market Account</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        
                                        <Form.Group as={Row} controlId="formHorizontalInternalAmount">
                                            <Form.Label column sm={2}>
                                                Amount
                                            </Form.Label>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                
                                                    <FormControl id="internalTransferAmount" size="lg" placeholder="0.00"/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    <Button variant="success">Tranfer Funds</Button>
                                </Card.Body>
                            </Card>

                            {errors.error && <Alert variant="danger">{errors.error}</Alert>}
                            {/* 
                                CARD FOR EXTERNAL TRANSFERS

                                "externalTransferSource"    value returns "default", "checkingAccount", "savingsAccoung", or "moneyMarketAccount"
                                "externalTransferAccountId" value returns Id entered of external user
                                "externalTransferAmount"    value returns the amount to be transfered
                            
                                upon hitting "Transfer Funds", do logic to calculate if account selected has required funds to transfer money
                            */}



                            <Card className="Tile">
                                <Card.Body className="TileBody">
                                    <h4>External Transfer</h4>
                                    <br></br>

                                    <Form onSubmit={this.handleSubmit} >
                                        <Form.Group as={Row} controlId="formHorizontalExternalSource">
                                            <Form.Label column sm={2}>
                                                From Account
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                as="select"
                                                id="externalTransferSource"
                                                size="lg"
                                                custom
                                                >
                                                    <option value="default">---Select an Account:---</option>
                                                    <option value="checkingAccount">Checking Account</option>
                                                    <option value="savingsAccount">Savings Account</option>
                                                    <option value="moneyMarketAccount">Money Market Account</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formHorizontalExternalDestination">
                                            <Form.Label column sm={2}>
                                                To User
                                            </Form.Label>
                                            <Col>
                                                <InputGroup>
                                                    <FormControl id="externalTransferAccountId" name="toAccount" value={this.state.toAccount} onChange={this.handleChange}size="lg" placeholder="Enter Destination Account Id. Format:  #####"></FormControl>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        
                                        <Form.Group as={Row} controlId="formHorizontalInternalAmount">
                                            <Form.Label column sm={2}>
                                                Amount
                                            </Form.Label>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                
                                                    <FormControl id="externalTransferAmount" name="amount" value={this.state.amount} onChange={this.handleChange}size="lg" placeholder="0.00"/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Button variant="success" type="submit" >Tranfer Funds</Button>
                                    </Form>


                                    {/* 
                                        BUTTON!!!
                                        no functionality yet
                                        variant just means the style/color of the button
                                    */}
                                    


                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
}

Transfers.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    transfer: PropTypes.func.isRequired
  };
const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI
})

const mapActionsToProps = {
    transfer
  };


export default connect(mapStateToProps, mapActionsToProps)(Transfers);