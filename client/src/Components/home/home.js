import { useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Message from "../message/message";
import './home.css'

import ProjectCards from "../projectcards/projectcards";
function Home() {

    return (
        <>
            <ProjectCards></ProjectCards>
            <Message></Message>
        </>
        );
}
export default Home;