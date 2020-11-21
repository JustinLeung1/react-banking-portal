import React from "react"
import {Button, Dropdown, DropdownButton, InputGroup, FormControl, Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"

export default function Transfers () {
    return (
        <div className="Dashboard">
        <Container fluid>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <Card classname="header">
                        <h2>Transfers</h2>
                        <div>
                <InputGroup className="mb-3">
                    <h4>From: </h4>
                    <InputGroup.Prepend>
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title="Dropdown"
                            id="input-group-dropdown-1"
                        >

                        <Dropdown.Item href="#">Checking Account</Dropdown.Item>
                        <Dropdown.Item href="#">Saving Account</Dropdown.Item>

                        </DropdownButton>
                    <FormControl
                            placeholder="Sender's username"
                            aria-label="Amount (to the nearest dollar)"/>
                        <InputGroup.Text>$</InputGroup.Text>
                        <input type="text" pattern="[0-9]*" placeholder = "0.00"/>
                    </InputGroup.Prepend>
              </InputGroup>
      <InputGroup className="mb-3">
          <h4>To: </h4>
          <InputGroup.Prepend>
              <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title="Dropdown"
                  id="input-group-dropdown-1"
              >

              <Dropdown.Item href="#">Checking Account</Dropdown.Item>
              <Dropdown.Item href="#">Saving Account</Dropdown.Item>

              </DropdownButton>
          <FormControl
                  placeholder="Recipient's username"
                  aria-label="Amount (to the nearest dollar)"/>
              <InputGroup.Text>$</InputGroup.Text>
              <input type="text" pattern="[0-9]*" placeholder = "0.00"/>
          </InputGroup.Prepend>
      </InputGroup>
      <Button variant="primary">Submit</Button>{' '}

</div>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
