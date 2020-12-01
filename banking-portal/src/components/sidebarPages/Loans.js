import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
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

                                {/* 
                                    WRITE CODE HERE 
                                    Create new Form
                                    https://react-bootstrap.github.io/components/forms/
                                    Copy the layout from payments to make a form with:

                                    loan type
                                    amount

                                */}

                                
                                
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