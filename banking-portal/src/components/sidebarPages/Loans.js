import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Sidebar from "../dashboardcomponents/Sidebar"
import "../../styles/Dashboard.css"

export default function Loans () {
    return (
        <div className="Dashboard">
        <Container fluid>
            <Row>
                <Col>
                    <Sidebar/>
                </Col>
                <Col>
                    <Card classname="header">
                        <h2>Loans</h2>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}