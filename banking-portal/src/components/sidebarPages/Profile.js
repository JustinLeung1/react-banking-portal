import React from "react"
import { Link} from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"



export default function Profile () {
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
                                <h2>Profile</h2>
                            </Card.Body>
                        </Card>
                    
                        <Card className="Tile">
                            <Card.Body className="TileBody">
                                <strong>USER: test@testtest.com</strong>
                                <br></br>
                                <br></br>
                                {/* <Link to = "/ChangePassword"> </Link> */}
                                <Button type ="Button">Change Password</Button>
                                
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
