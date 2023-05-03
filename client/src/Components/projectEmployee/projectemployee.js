import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Calendar } from "react-calendar";
import './projectemployee.css'

function ProjectEmployee() {

    const username = JSON.parse(localStorage.getItem("user"));
    const [ProjList, setProj] = useState("");

    const [multiProjSel, setMProj] = useState([]);

    const [multiProjSingSel, setMSProj] = useState([]);

    const [NTimelinedata, setNTimeline] = useState("");
    const [projectDeadline, setPDDate] = useState(new Date());

    const getprojlist = async () => {

        let listresult = await fetch(`${process.env.REACT_APP_SERVER_URL}/getproject`, {
            method: 'post',
            body: JSON.stringify(),
            headers: {
                'Content-type': 'application/json'
            }
        });
        listresult = await listresult.json();

        if (listresult) {


            setProj(listresult);


        }
    };

    useEffect(() => {

        getprojlist();
    }, []);

    useEffect(() => {
        // alert("state changed" + multiProjSel[0])
        if (multiProjSel[0]) {
            MultipleProjSelectIndex();

        }
    }, [multiProjSel]);

    const setTimeline = async () => {
        // let temp_Status = multiStatusProjSel;
        // if(temp_Status)
        // {
        //     temp_Status= multiProjSingSel.pstatus;
        // } 

        let modifyPResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/addusertimeline`, {
            method: 'post',
            body: JSON.stringify({
                project_id: multiProjSingSel._id,
                timeline: {
                    timeline_body: NTimelinedata,
                    timeline_sender: username.name,
                    time: projectDeadline
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        modifyPResult = await modifyPResult.json();

        if (modifyPResult) {

            alert("Timeline Added");



        }
    };

    const addtimeline = () => {
        if (NTimelinedata.length >= 1) {
            // alert('new message sending ' + NTimelinedata);
            console.warn("button nmsg " + NTimelinedata);

            setTimeline();
        }
        else {
            alert("plesea add message");
        }
        // setNMsg(e.target.value);
    };

    const MultipleProjSelect = (e) => {
        setMProj(Array.isArray(e) ? e.map(x => x._id) : []);
        console.warn("multi " + multiProjSel);
    };

    const MultipleProjSelectIndex = () => {     // selects index of project
        // alert("multi select");
        console.warn("selected" + multiProjSel[0]);
        let temp_index = -1;

        let filteredObj;

        // filteredObj = ProjList.find(function (item, i) {
        //     if (item._id ===multiProjSel[0]) {
        //         temp_index = i;
        //         return i;
        //     }
        // });
        for (let i = 0; i < ProjList.length; i++) {
            if (ProjList[i]._id == multiProjSel[0]) {
                temp_index = i;
                filteredObj = ProjList[i];
                // setMSProj(ProjList[i]);
                break;
            }
        }
        setMSProj(filteredObj);
        // alert(filteredObj);
        console.warn("index " + temp_index, filteredObj);




    };



    return (
        <Container class='card w-50 h-50 position-absolute top-25 start-25 shadow bg-body rounded bg-info'>
            <label className="inputLabel">Select Project</label>

            {ProjList ? <Multiselect singleSelect={true} options={ProjList} displayValue="name" onSelect={MultipleProjSelect} ></Multiselect> : <span>loading Project</span>}
            {multiProjSel + ""}
            {
                multiProjSingSel._id ?
                    <>
                        <label> Add Timeline </label>
                        <input className="messageInput" onChange={(e) => setNTimeline(e.target.value)} type="text" placeholder="Message"></input>
                        <label className="inputLabel">Select Deadline</label>
                        <Calendar className="calendarStyle" minDate={new Date()} onClickDay={(v, e) => setPDDate(v)} tileContent={({ date, view }) => view === 'month' && date.getDate() === projectDeadline.getDate() && date.getMonth() === projectDeadline.getMonth() && date.getFullYear() === projectDeadline.getFullYear() ? <p  >Selected </p> : null} ></Calendar>
                        <button className="inkartikputBtn" onClick={addtimeline} >Add To Timeline</button>
                    </> : <p class='card bg-opacity-75  mt-5 bg-dark text-light'>Please Select a Project</p>
            }
        </Container>
    );
}

export default ProjectEmployee;