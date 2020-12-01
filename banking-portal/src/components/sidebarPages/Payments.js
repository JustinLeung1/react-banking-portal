import React from "react"
import {Button, InputGroup, DropdownButton, Dropdown, FormControl, Container, Row, Col, Card, Form, ListGroup } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"

export default function Payments () {
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
                                <h2>Payments</h2>
                            </Card.Body>
                        </Card>



                        {/* 
                                CARD FOR LOAN PAYMENTS

                                "loanSourceAccount"         value returns "default", "checkingAccount", "savingsAccoung", or "moneyMarketAccount"
                                "loanDestinationAccount"    value returns "default", "loanAccount1", or "loanAccount2" -ids subject to future change
                                "loanDestinationBalance"
                                "loanPaymentAmount"         value returns the amount to be paid
                            
                                upon hitting "Make Payment", do logic to calculate if account selected has required funds to make the payment
                            */}


                        <Card className="Tile">
                            <Card.Body className="TileBody">
                                

                                <h4>Bank Loan Payment</h4>
                                <br></br>
                                

                                <Form>
                                        <Form.Group as={Row} controlId="formHorizontalLoanSource">
                                            <Form.Label column sm={2}>
                                                From Account
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                as="select"
                                                id="loanSourceAccount"
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

                                        <Form.Group as={Row} controlId="formHorizontalLoanDestination">
                                            <Form.Label column sm={2}>
                                                To Loan Account
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                as="select"
                                                id="loanDestinationAccount"
                                                size="lg"
                                                placeholder="Select Account"
                                                custom
                                                >
                                                    <option value="default">---Select an Account:---</option>
                                                    <option value="loanAccount1">Chips Premier Credit Card</option>
                                                    <option value="loanAccount2">Chips Car Loan</option>
                                                    
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formHorizontalLoanBalance">
                                            <Form.Label column sm={2}>
                                                Loan Balance
                                            </Form.Label>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                
                                                    <FormControl id="loanDestinationBalance" size="lg" placeholder="0.00" readOnly/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        
                                        <Form.Group as={Row} controlId="formHorizontalPaymentAmount">
                                            <Form.Label column sm={2}>
                                                Amount
                                            </Form.Label>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                
                                                    <FormControl id="loanPaymentAmount" size="lg" placeholder="0.00"/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    

                                    {/* 
                                        BUTTON!!!
                                        no functionality yet
                                        variant just means the style/color of the button
                                    */}
                                    <Button variant="success">Make Payment</Button>


                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
