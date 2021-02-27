import React from 'react'
import {Card,Row,Col,Container,Button} from 'react-bootstrap'
import Myppt from '../AutoPPT-main/AutoPPT-main/something.pptx';

export default function ConvertToPPT() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Smart Content Creator</Card.Header>
                        <Card.Body>
                        <Card.Title> Congratulations </Card.Title>
                        <Card.Text>
                            Your Powerpoint presentation is ready. Please download it using the following button.
                        </Card.Text>
                        <a href={Myppt} download target="_blank"> <Button variant="primary">Download</Button></a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
      )
}
