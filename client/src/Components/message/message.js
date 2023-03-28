import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Tab, Tabs, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import './message.css';
function Message() {
    const username = JSON.parse(localStorage.getItem("user"));
    const [userMessage, setUMesg] = useState("");
    const isLoading = useRef(true); // Loading state
    // console.warn("uname "+username.name);
    const [tabkey, seTKey] = useState("mclose");
    const [MPIndex, setMPIndex] = useState(0);
    const [NMsgdata, setNMsg] = useState("");

    const getUmessage = async () => {

        let userMData = await fetch("http://localhost:3001/getusermessage", {
            method: "post",
            body: JSON.stringify({
                name: username.name
            }),
            headers: {
                'Content-type': 'application/json'
            }

        })

        userMData = await userMData.json();
        if (userMData) {
            setUMesg(userMData);
            console.warn("umsg " + userMData[0].project_id[0].message[0].message_body)
            // console.warn("usmsfn ");
            isLoading.current = false;
        }
    };
    const addnewmsg = async () => {
        let addmsgstatus = await fetch("http://localhost:3001/messageadd", {
            method: "post",
            body: JSON.stringify({
                project_id: userMessage[0].project_id[MPIndex]._id,
                message:{
                    message_body:NMsgdata,
                    message_sender:username.name
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        addmsgstatus = await addmsgstatus.json();
        if(addmsgstatus)
        {
            console.warn(addmsgstatus);
            getUmessage();
        }

    };


    const sendNMsg = () => {
        alert('new message sending ' + NMsgdata);
        console.warn("button nmsg " + NMsgdata);
        addnewmsg();
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


    // useEffect(() => {
    //     // alert("messge set")

    // }, [NMsgdata]);


    // const Showmessage = () => {
    //     // alert("sshow message ");
    //     if (userMessage) {
    //         alert("its working " + userMessage[0].project_id[0].message[0].message_body);


    //         return <div>
    //             {userMessage.map(user =>
    //                 user.project_id.map(project =>
    //                     project.message.map(m =>
    //                         m.message_sender == username.name ?


    //                             <span className="messageSend ">
    //                                 <span className="messageSendBody">{m.message_body}</span>
    //                                 <span className="messageSendTime ">1:00</span>
    //                             </span>



    //                             :
    //                             <span className="messageReceived ">
    //                                 <span className="messageReceivedBody">{m.message_body}</span>
    //                                 <span className="messageReceivedTime ">12:00</span>
    //                             </span>


    //                     )
    //                 )
    //             )}
    //         </div>
    //     }
    //     else {
    //         return <div> Getting Message</div>
    //     }


    // };


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
                    className="mb-3" >


                    <Tab eventKey="mclose" >
                        <ListGroup>
                            {userMessage.map(user => user.project_id.map((project, pindex) => <ListGroup.Item action onClick={() => openMContainer(pindex)}>{project.name}</ListGroup.Item>))}
                        </ListGroup>


                    </Tab>
                    <Tab eventKey="mopen" >

                        {userMessage.map(user =>

                            <Container className="messageBody">


                                {user.project_id[MPIndex].message.map(m =>
                                    <>{
                                        m.message_sender == username.name ?


                                            <span className="messageSend ">
                                                <span className="messageSendBody">{m.message_body}</span>
                                                <span className="messageSendTime ">1:00</span>
                                            </span>



                                            :
                                            <span className="messageReceived ">
                                                <span className="messageReceivedBody">{m.message_body}</span>
                                                <span className="messageReceivedTime ">12:00</span>
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
            return (<div> Getting Message</div>);
        }


    };



    if (isLoading.current) {
        return (
            <div>Loading hold on

            </div>
        );
    }
    else {
        return (
            <Container className="messageContainer">
                {/* <button onClick={getUmessage}> get api</button> */}
                {/* <ListGroup> */}
                <Showmessage />


                {/* </ListGroup> */}

                {/* <Container className="messageBody">
                <span className="messageReceived ">
                        <span className="messageReceivedBody">jaysing hfkjfdf kfdf f dskfh dfhfj fkjfhdkjfd</span>
                        <span className="messageReceivedTime ">12:00</span>
                    </span>

                    <span className="messageSend ">
                        <span className="messageSendBody">jaysing hfkjfdf kfdf f dskfh dfhfj fkjfhdkjfd</span>
                        <span className="messageSendTime ">1:00</span>
                    </span>

                </Container> */}
                <Container className="messageBar ">
                    <input className="messageInput" onChange={(e) => setNMsg(e.target.value)} type="text" placeholder="Message"></input>
                    <p>{NMsgdata}</p>
                    <Button onClick={sendNMsg}></Button>
                </Container>

            </Container>
        );
    }
}

export default Message;