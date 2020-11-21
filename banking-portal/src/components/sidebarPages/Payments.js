import React from "react"
import {Button, InputGroup, DropdownButton, Dropdown, FormControl, Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"

export default function Payments () {
    return (
        <div className="Dashboard">
        <Container fluid>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <Card className="header">
                        <h2>Payments</h2>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Dropdown"
                                    id="input-group-dropdown-1"
                                >

                                <Dropdown.Item href="#">Paybill</Dropdown.Item>
                                <Dropdown.Item href="#">Credit card</Dropdown.Item>

                                </DropdownButton>
                            <FormControl
                                    placeholder="Sender's username"
                                    aria-label="Amount (to the nearest dollar)"/>
                                <InputGroup.Text>$</InputGroup.Text>
                                <input type="text" pattern="[0-9]*" placeholder = "0.00"/>
                            </InputGroup.Prepend>
                      </InputGroup>
                      <Button variant="primary">Submit</Button>{' '}
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
