import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"

export default function Profile () {
    return (
        <div className="Dashboard">
        <Container fluid>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <Card classname="header">
                        <h2>Profle</h2>
                        <br></br>
                        <strong>USER: test@testtest.com</strong>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}