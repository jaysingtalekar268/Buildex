import { Container, Row, Col, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import './message.css';
function Message() {
    return (
        <Container className="messageContainer">
            <ListGroup>
                <ListGroupItem className="messageListItem">Jaysing</ListGroupItem>
                <ListGroupItem className="messageListItem">Siddhant</ListGroupItem>
                <ListGroupItem className="messageListItem">Kunal</ListGroupItem>
            </ListGroup>

            <Container className="messageBody">
                <span className="messageReceived ">
                    <span className="messageReceivedBody">jaysing hfkjfdf kfdf f dskfh dfhfj fkjfhdkjfd</span>
                    <span class="messageReceivedTime ">12:00</span>
                </span>

                <span className="messageSend ">
                    <span className="messageSendBody">jaysing hfkjfdf kfdf f dskfh dfhfj fkjfhdkjfd</span>
                    <span class="messageSendTime ">1:00</span>
                </span>

            </Container>
            <Container className="messageBar ">
                <input className="messageInput" type="text" placeholder="Message"></input>
                <Button></Button>
            </Container>

        </Container>
    );
}

export default Message;