import React from "react"
import {Button, Dropdown, Form, DropdownButton, InputGroup, FormControl, Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"
import DropdownItem from "react-bootstrap/esm/DropdownItem"

export default function Transfers () {
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

                                    <Form>
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
                                                    <FormControl id="externalTransferAccountId" size="lg" placeholder="Enter Destination Account Id. Format:  #####"></FormControl>
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
                                                
                                                    <FormControl id="externalTransferAmount" size="lg" placeholder="0.00"/>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Form>


                                    {/* 
                                        BUTTON!!!
                                        no functionality yet
                                        variant just means the style/color of the button
                                    */}
                                    <Button variant="success">Tranfer Funds</Button>


                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
