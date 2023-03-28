import { useEffect } from "react";
import { Button,Container,Row,Col } from "react-bootstrap";
import Message from "../message/message";
import './home.css'

import ProjectCards from "../projectcards/projectcards";
function Home() {
    
    return (<div>
            <Container fluid className="homeContainer">
               <Row>
                <Col className="homeCol" sm="1">  </Col>
                <Col className="homeCol " ><ProjectCards></ProjectCards></Col>
                <Col className="homeCol" md="3"><Message></Message></Col>
               </Row>
            </Container>
    </div>);
}
export default Home;