import { useEffect, useRef, useState } from "react";

import { Container, Row, Col, Tab, Tabs, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import './message.css';
import sendicon from '../message/send-icon.png';



function Message() {
    const username = JSON.parse(localStorage.getItem("user"));
    const [userMessage, setUMesg] = useState("");
    const isLoading = useRef(true); // Loading state
    // console.warn("uname "+username.name);
    const [tabkey, seTKey] = useState("mclose");
    const [MPIndex, setMPIndex] = useState(0);
    const [NMsgdata, setNMsg] = useState("");

    const getUmessage = async () => {

        let userMData = await fetch(`${process.env.REACT_APP_SERVER_URL}/getusermessage`, {
            method: "post",
            body: JSON.stringify({
                name: username.name
            }),
            headers: {
                'Content-type': 'application/json'
            }

        })

        userMData = await userMData.json();
        if (userMData[0].project_id[0]) {
            setUMesg(userMData);
            console.warn("umsg " + userMData[0].project_id[0].message[0].message_body)
            // console.warn("usmsfn ");
            isLoading.current = false;
        }
    };
    const addnewmsg = async () => {
        let addmsgstatus = await fetch(`${process.env.REACT_APP_SERVER_URL}/messageadd`, {
            method: "post",
            body: JSON.stringify({
                project_id: userMessage[0].project_id[MPIndex]._id,
                message: {
                    message_body: NMsgdata,
                    message_sender: username.name,
                    time: new Date()
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        addmsgstatus = await addmsgstatus.json();
        if (addmsgstatus) {
            console.warn(addmsgstatus);
            getUmessage();
        }

    };


    const sendNMsg = () => {
        if (NMsgdata.length >= 1) {
            // alert('new message sending ' + NMsgdata);
            console.warn("button nmsg " + NMsgdata);

            addnewmsg();
        }
        else {
            alert("plesea add message");
        }
        // setNMsg(e.target.value);
    };



    useEffect(() => {
        if (isLoading.current) {
            getUmessage();

            isLoading.current = false;

        }
        else {

            // test();

        }


    }, []);


    useEffect(() => {
        Showmessage();
    }, [userMessage]);


    const openMContainer = (index) => {
        // alert("calling mopener")
        seTKey("mopen");
        setMPIndex(index);
        console.warn("index " + index)
    };
    const Showmessage = () => {
        // alert("sshow message ");
        if (userMessage) {
            // alert("its working " + userMessage[0].project_id[0].message[0].message_body);


            return (

                <Tabs id="controlled-tab-example"
                    activeKey={tabkey}
                    onSelect={(k) => seTKey(k)}
                    class="" >


                    <Tab eventKey="mclose" >
                        <ListGroup>
                            {userMessage.map(user => user.project_id.map((project, pindex) => <ListGroup.Item action onClick={() => openMContainer(pindex)}>{project.name}</ListGroup.Item>))}
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="mopen" >

                        {userMessage.map(user =>
                            <Container className="card messageBody">
                                {user.project_id[MPIndex].message.map(m =>
                                    <>{
                                        m.message_sender == username.name ?
                                            <span className="card card-title messageSend w-10 ">
                                                <span className="messageSendBody">{m.message_body}</span>
                                                <span className="messageSendTime ">{new Date(m.time).getHours() + ":" + new Date(m.time).getMinutes()}</span>
                                            </span>
                                            :
                                            <span className="card card-footer messageReceived">
                                                <span className="messageReceivedBody">{m.message_body}</span>
                                                <span className="messageReceivedTime ">{new Date(m.time).getHours() + ":" + new Date(m.time).getMinutes()}</span>
                                            </span>
                                    }
                                    </>
                                )}
                            </Container>
                        )}
                    </Tab>
                </Tabs>

            );
        }
        else {
            return (<div class='card bg-opacity-75  bg-dark text-light'> Getting Message</div>);
        }


    };



    if (isLoading.current) {
        return (
            <div class=' card spinner-border text-danger bg-opacity-75  bg-dark text-light' ><div class=" visually-hidden"></div></div>
        );
    }
    else {
        return (
            <>
                <button class="btn btn-primary position-absolute bottom-0 end-0 m-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#messageBox" aria-controls="messageBox">
                    Message
                </button>
                <div class='offcanvas offcanvas-start w-25 overflow-scroll' scroll='true' id='messageBox' aria-labelledby="MessageBoxLabel">
                    <button class='btn btn-close btn-dark mt-3 ms-2 ' onClick={() => seTKey("mclose")} ></button>

                    <Showmessage />
                    <div class="fs-5 input-group mx-auto">
                        <input class='input w-75 mx-auto' onChange={(e) => setNMsg(e.target.value)} type="text" placeholder="Message"></input>
                        <button class='btn btn-lg btn-primary me-auto' onClick={sendNMsg}><img src={sendicon} class='img-thumbnail icon' width={40} height='40'></img></button>
                    </div>
                </div>
            </>
        );
    }
}

export default Message;