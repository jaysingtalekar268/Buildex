import { Container, Tabs, Tab, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';

import './projectManager.css';
import { Calendar } from "react-calendar";
function ProjectManager() {
    const [projectName, setPName] = useState("");
    const [projectDesc, setPDesc] = useState("");
    const [projectType, setPType] = useState("");
    const [projectDeadline, setPDDate] = useState(new Date());

    const [tabKey, setTab] = useState('NProject');
    const [devList, setDev] = useState("");
    const [selDevList, setSelDev] = useState();
    const temp = [{ name: "raj", id: 12 },
    { name: "jay", id: 45 }];
    const [multiDevSel, setMDev] = useState([]);

    useEffect(() => {
        getlist();
    }, []);




    const addProject = async () => {
        alert(projectName + projectDesc);
        let addresult = await fetch("http://localhost:3001/Projectadd", {
            method: 'post',
            body: JSON.stringify({
                name: projectName,
                desc: projectDesc,
                devl_id: multiDevSel,
                catg: projectType,
                deadline: projectDeadline,
                message:[{
                    message_body:"hello",
                    message_sender:"manager"
                }],
                created: new Date(),
                pstatus: "incomp"
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        addresult = addresult.json();

    };

    const getlist = async () => {

        let listresult = await fetch("http://localhost:3001/getdevl", {
            method: 'post',
            body: JSON.stringify(),
            headers: {
                'Content-type': 'application/json'
            }
        });
        listresult = await listresult.json();

        if (listresult) {

            setDev(listresult);



        }
    };

    const ename = (names) => {

        if (devList) {
            console.warn("devlist" + devList);
            return names.map(name => <option value={name._id}>{name.name + " " + name._id}</option>);
        }

    }

    const MultipleSelect = (e) => {
        // alert("multi select");
        setMDev(Array.isArray(e) ? e.map(x => x._id) : []);
        console.warn("multi " + multiDevSel);

    };

    // const MultipleRemove = (e) => {
    //   alert("multi remove");
    //     setMDev([]);
    //     console.warn("multi " + multiDevSel);

    // };

    const Addsel = (e) => {
        alert("im calling");
        setSelDev(e.target.value);
    };

    console.warn("pdeadline " + projectDeadline.getDate());

    return (
        <Container className="mainContainer">
            <Row>
                <Col className="accountMenu" lg={1}>
                    <ul>
                        <li className="menuItem"><a className="menuLink" onClick={() => setTab("NProject")}> New Project </a></li>
                        <li className="menuItem"><a className="menuLink" onClick={() => setTab("MProject")}> Modify Project</a></li>
                        <li className="menuItem"><a className="menuLink" onClick={() => setTab("DProject")}> Delete Project</a></li>
                    </ul>
                </Col>
                <Col className="accountMenuInfo">
                    <Container>
                        <Tabs activeKey={tabKey}>
                            <Tab eventKey="NProject" >
                                <label className="inputLabel">Project Name</label>
                                <input className="input" onChange={e => setPName(e.target.value)}></input>
                                <label className="inputLabel">Project Description</label>
                                <input className="input" onChange={(e) => setPDesc(e.target.value)}></input>
                                <label className="inputLabel">Project category</label>
                                <input className="input" onChange={(e) => setPType(e.target.value)}></input>


                                {/* <select name="devSel" id="devSel" onChange={Addsel} multiple>
                                    {ename(devList)}
                                </select>
                                {selDevList} */}

                                <label className="inputLabel">Select Deadline</label>
                                <Calendar minDate={new Date()} onClickDay={(v, e) => setPDDate(v)} tileContent={({ date, view }) => view === 'month' && date.getDate() === projectDeadline.getDate() && date.getMonth() === projectDeadline.getMonth() && date.getFullYear() === projectDeadline.getFullYear() ? <p>Selected </p> : null} ></Calendar>
                                <label className="inputLabel">Select Developers</label>

                                {devList ? <Multiselect options={devList} displayValue="name" onSelect={MultipleSelect} ></Multiselect> : <span>loading user</span>}
                                {multiDevSel + ""}
                                <button className="inputBtn" onClick={addProject} >Add Project</button>


                            </Tab>
                            <Tab eventKey="MProject" >
                                herer mo
                            </Tab>
                            <Tab eventKey="DProject" >
                                herer dew
                            </Tab>
                        </Tabs>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}



export default ProjectManager;