import React from "react"
import {Form, Container, Row, Col, Card, Button } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"

export default function Loans () {
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
                                <h2>Loans</h2>
                            </Card.Body>
                        </Card>


                        <Card className="Tile">
                            <Card.Body className="TileBody">

                                <h4>Loan Portal</h4>
                                        <br></br>


                                  <Form>
                                  <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Desired loan amount
                                    </Form.Label>
                                  <Col sm="2">
                                    <Form.Control type="loan" placeholder="$0.00" />
                                  </Col>
                                  </Form.Group>
                                  <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        What will loan be used for?
                                    </Form.Label>
                                        <Col>
                                        <Form.Control
                                        as="select"
                                        id="loanSourceAccount"
                                        size="lg"
                                        custom
                                        >
                                            <option value="default">---Select Loan:---</option>
                                            <option value="">Credit</option>
                                            <option value="">House Buying</option>
                                            <option value="">Car Loan</option>
                                            <option value="">Boat Loan</option>
                                        </Form.Control>
                                        </Col>

                                    </Form.Group>
                                    <br></br>
                                    <Form.Row>
                                      <Col>
                                        <Form.Label> First name </Form.Label>
                                        <Form.Control placeholder="First name" />
                                      </Col>
                                      <Col>
                                        <Form.Label> Last name </Form.Label>
                                        <Form.Control placeholder="Last name" />
                                      </Col>
                                    </Form.Row>
                                    <br></br>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                      <Form.Label>Email</Form.Label>
                                      <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    </Form.Row>

                                    <Form.Group controlId="formGridAddress1">
                                      <Form.Label>Address</Form.Label>
                                      <Form.Control placeholder="1234 Main St" />
                                    </Form.Group>

                                    <Form.Group controlId="formGridAddress2">
                                      <Form.Label>Address 2</Form.Label>
                                      <Form.Control placeholder="Apartment, studio, or floor" />
                                    </Form.Group>

                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                      <Form.Label>City</Form.Label>
                                      <Form.Control />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                      <Form.Label>State</Form.Label>
                                      <Form.Control />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                      <Form.Label>Zip</Form.Label>
                                      <Form.Control />
                                    </Form.Group>
                                    </Form.Row>

                                  </Form>
                                  <br></br>
                                {/*
                                    BUTTON!!!
                                    no functionality yet
                                    variant just means the style/color of the button
                                */}
                                <Button variant="success">Take Out Loan</Button>

                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
