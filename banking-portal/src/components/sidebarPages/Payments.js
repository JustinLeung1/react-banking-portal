import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
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
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}