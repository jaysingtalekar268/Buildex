import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Calendar from 'react-calendar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function PCalendar() {
    const username = JSON.parse(localStorage.getItem("user"));

    const [userPdata, setUPData] = useState("");


    const getdeadlines = async () => {

        let deadlinesResult = await fetch("http://localhost:3001/getuserprojectstatus", {
            method: "post",
            body: JSON.stringify({
                name: username.name,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        deadlinesResult = await deadlinesResult.json();
        console.warn("before da " + deadlinesResult);
        if (deadlinesResult) {
            console.warn("if fetch" + deadlinesResult[0].project_id[0].deadline);
            setUPData(deadlinesResult);
        }
    };

    useEffect(() => {
        getdeadlines();
    }, []);



    const addevent = (v, e) => {
        alert(v);
        console.warn(v);

    };
    const d = new Date();
    // d.setFullYear(2023,2,26);

    const getevent = ({ date, view }) => {
        alert("get event ");
        const td = new Date(userPdata[0].project_id[0].deadline);
        console.warn(" get event " + td.getDate());
        if (userPdata[0]) {
            console.warn(" its if ");
            userPdata.map(x => x.project_id.map(y => {

                if (view == 'month' && date.getDate() === y.deadline.getDate() && date.getMonth() === y.deadline.getMonth() && date.getFullYear() === y.deadline.getFullYear()) {
                    console.warn("y  " + y.pstatus)

                    if (y.pstatus == "comp") {
                        // return (<p>{y.name} Completed </p> );
                    }
                    else if (y.pstatus == "incomp") {
                        alert("icomp title");

                        // return (<p>{y.name} Incompleted </p> );
                    }

                    else if (y.pstatus == "ovdue") {

                        // return (<p>{y.name} Overdue </p> );
                    }
                }





            }));

        }
        else {
        }

    };
    if (userPdata[0]) {
        return (

            <Container>
                <button onClick={getevent}>add event</button>
                <Calendar onClickDay={addevent}
                    
                // tileContent={({ date, view }) => view === 'month' && date.getDate() === 26 && date.getMonth()===2  ? <p>It's Sunday! { 5+d}</p> : null}
                ></Calendar>

                {/* tileContent={({ date, view }) => view === 'month' && date.getDate() === projectDeadline.getDate() && date.getMonth() === projectDeadline.getMonth() && date.getFullYear  () === projectDeadline.getFullYear()   ? <p>Selected </p> : null} */}

                <Popup trigger={<button className="button"> Add Event </button>} modal>
                    <span> Modal content </span>
                </Popup>
            </Container>
        );
    }
    else {
        <div>Waiting for data</div>
    }
};

export default PCalendar;