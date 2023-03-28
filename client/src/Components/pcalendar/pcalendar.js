import { useEffect, useState, useRef } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Calendar from 'react-calendar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function PCalendar() {
    const username = JSON.parse(localStorage.getItem("user"));
    const [userDData, setUDData] = useState("");
    const [userEData, setUEData] = useState("");
    const [userEDate, setUEDate] = useState();
    const [tabkey, seTKey] = useState("eclose");
    const isLoading = useRef(true); // Loading state
    const getdates = async () => {
        let DateResult = await fetch("http://localhost:3001/getuserdates", {
            method: 'post',
            body: JSON.stringify({
                name: username.name

            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        DateResult = await DateResult.json();


        if (DateResult) {
            console.warn("date " + DateResult[0].project_id[0].deadline);
            setUDData(DateResult);
            isLoading.current = false;

        }

    };

    useEffect(() => {
        if (isLoading.current) {
            getdates();

            isLoading.current = false;

        }

    }, []);


    const setevent = async () => {
        let eventResult = await fetch("http://localhost:3001/eventadd", {
            method: 'post',
            body: JSON.stringify({
                name: username.name,
                event: {
                    event_body: userEData,

                    event_date: userEDate
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (eventResult) {
            alert("event added ");
        }



    }

    const addevent = (v, e) => {

        if (userEData.length >= 1) {
            setevent();
        }
        else {
            alert("enter event details")
        }

    };
    const openevet = (v, e) => {
        setUEDate(v);

        seTKey("eopen");
        alert(v);

    };

    if (userDData) {
        // alert(userDData[0].userevent[0].event_body)
        return (

            <Container>
                <Tabs id="controlled-tab-example"
                    activeKey={tabkey}
                    onSelect={(k) => seTKey(k)}
                    className="mb-3" >
                    <Tab eventKey="eclose" >
                        <Calendar onClickDay={openevet}
                            tileContent={
                                (
                                    ({ date, view }) =>
                                        userDData.map(user =>
                                        (
                                            <>
                                                <>
                                                    {user.project_id.map(project =>
                                                        <>
                                                            <>
                                                                {view === 'month' && date.getDate() === new Date(project.deadline).getDate()
                                                                    && date.getFullYear() === new Date(project.deadline).getFullYear()
                                                                    && date.getMonth() === new Date(project.deadline).getMonth()
                                                                    ? <p>{project.name} status {project.pstatus}</p> : null
                                                                }
                                                            </>
                                                            <>
                                                                {view === 'month' && date.getDate() === new Date(project.created).getDate()
                                                                    && date.getFullYear() === new Date(project.created).getFullYear()
                                                                    && date.getMonth() === new Date(project.created).getMonth()
                                                                    ? <p>{project.name} created</p> : null
                                                                }
                                                            </>

                                                        </>

                                                    )
                                                    }
                                                </>
                                                <>

                                                    {user.userevent.map(uevent =>
                                                        <>
                                                            {
                                                                view === 'month' && date.getDate() === new Date(uevent.event_date).getDate()
                                                                    && date.getFullYear() === new Date(uevent.event_date).getFullYear()
                                                                    && date.getMonth() === new Date(uevent.event_date).getMonth()
                                                                    ? <p>{uevent.event_body} </p> : null
                                                            }
                                                        </>
                                                    )}
                                                </>
                                            </>
                                        )

                                        )
                                )
                            } >

                        </Calendar>
                    </Tab>
                    <Tab eventKey="eopen" >
                        <label >Selected Date {userEDate ? userEDate.toDateString() : null}</label>
                        <input className='eInput' onChange={(e) => setUEData(e.target.value)} type="text" placeholder='Enter eventdata'></input>
                        <button onClick={addevent}> Add event</button>
                        <button onClick={()=>seTKey("eclose")}> Back</button>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
    else {
        return <div>data is loading</div>
    }
}

export default PCalendar;