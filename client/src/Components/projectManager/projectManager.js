import { Container, Tabs, Tab, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';

import './projectManager.css';
import { Calendar } from "react-calendar";
function ProjectManager() {
    //dont change anything here 
    const [projectName, setPName] = useState("");
    const [projectDesc, setPDesc] = useState("");
   
    const [projectType, setPType] = useState("");
    const [projectDeadline, setPDDate] = useState(new Date());

    const [tabKey, setTab] = useState('MProject');

    const [devList, setDev] = useState("");
    const [ProjList, setProj] = useState("");
    const [MangList, setMang] = useState("");
    const [selDevList, setSelDev] = useState();

    const [MangPreList, setMPreList] = useState([]);
    const [DevlPreList, setDPreList] = useState([]);


    const [multiDevSel, setMDev] = useState([]);
    const [multiMangSel, setMMang] = useState([]);
    const [multiProjSel, setMProj] = useState([]);
    const [multiStatusProjSel, setMStatusProj] = useState();

    const [multiProjSingSel, setMSProj] = useState([]);

    useEffect(() => {
        getdevlist();
        getmanglist();
        getprojlist();
    }, []);

    useEffect(() => {
        alert("state changed" + multiProjSel[0])
        if (multiProjSel[0]) {
            MultipleProjSelectIndex();

        }
    }, [multiProjSel]);




    const addProject = async () => {
        alert(projectName + projectDesc);
        let addresult = await fetch("http://localhost:3001/Projectadd", {
            method: 'post',
            body: JSON.stringify({
                name: projectName,
                desc: projectDesc,
                devl_id: multiDevSel,
                mang_id: multiMangSel,
                catg: projectType,
                deadline: projectDeadline,
                message: [{
                    message_body: "hello",
                    message_sender: "manager",
                    time: new Date()
                }],
                created: new Date(),
                pstatus: "incomp",
                catg: projectType,
                deadline: projectDeadline,
                message: [{
                    message_body: "hello",
                    message_sender: "manager",
                    time:new Date()
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

    const getdevlist = async () => {

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

    const getprojlist = async () => {

        let listresult = await fetch("http://localhost:3001/getproject", {
            method: 'post',
            body: JSON.stringify(),
            headers: {
                'Content-type': 'application/json'
            }
        });
        listresult = await listresult.json();

        if (listresult) {

            setProj(listresult);
            console.warn("listr resi;", listresult);


        }
    };

    const getmanglist = async () => {

        let listresult = await fetch("http://localhost:3001/getmang", {
            method: 'post',
            body: JSON.stringify(),
            headers: {
                'Content-type': 'application/json'
            }
        });
        listresult = await listresult.json();

        if (listresult) {

            setMang(listresult);



        }
    };

    const modifyProject = async () => {
        // let temp_Status = multiStatusProjSel;
        // if(temp_Status)
        // {
        //     temp_Status= multiProjSingSel.pstatus;
        // } 

        let modifyPResult = await fetch("http://localhost:3001/projectmodify", {
            method: 'post',
            body: JSON.stringify({
                p_id:multiProjSingSel._id,
                name: projectName,
                desc: projectDesc,
               
                catg: projectType,
                deadline: projectDeadline,
                devl_id: multiDevSel,
                mang_id: multiMangSel,
               
                pstatus: multiStatusProjSel
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        modifyPResult = await modifyPResult.json();

        if (modifyPResult) {

           alert("Project Modified");



        }
    };

    const ename = (names) => {

        if (devList) {
            console.warn("devlist" + devList);
            return names.map(name => <option value={name._id}>{name.name + " " + name._id}</option>);
        }

    }

    const MultipleDevSelect = (e) => {
        // alert("multi select");
        setMDev(Array.isArray(e) ? e.map(x => x._id) : []);
        console.warn("multi " + multiDevSel);

    };
    const MultipleMangSelect = (e) => {
        // alert("multi select");
        setMMang(Array.isArray(e) ? e.map(x => x._id) : []);
        console.warn("multi " + multiMangSel);

    };
    const MultipleProjSelect = (e) => {
        setMProj(Array.isArray(e) ? e.map(x => x._id) : []);
        console.warn("multi " + multiProjSel);
    };

    // const MultipleProjStatusSelect = (e) => {
    //     setMStatusProj();
    //     console.warn("multi status " + e[0].name);
    // };


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
        alert(filteredObj);
        console.warn("index " + temp_index, filteredObj);

        setPDDate(new Date(filteredObj.deadline));
        setPName(filteredObj.name);
        setPDesc(filteredObj.desc);
        setPType(filteredObj.catg);
        setPName(filteredObj.name);
        setMStatusProj(filteredObj.pstatus);
        MangList.map(mang =>
            // console.warn("mang id ",filteredObj.mang_id)
            filteredObj.mang_id.map(m_id => m_id == mang._id ? setMPreList(MangPreList => [...MangPreList, { name: mang.name }]) : null)

        );

        devList.map(devl =>
            // console.warn("mang id ",filteredObj.mang_id)
            filteredObj.devl_id.map(d_id => d_id._id == devl._id ? setDPreList(DevlPreList => [...DevlPreList, { name: devl.name }]) : null)

        );


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
                                <label className="inputLabel" >Project Name</label>
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
                                <label className="inputLabel">Select Mangers</label>

                                {MangList ? <Multiselect options={MangList} displayValue="name" onSelect={MultipleMangSelect} ></Multiselect> : <span>loading Mangers</span>}
                                {multiMangSel + ""}

                                <label className="inputLabel"> Select Developers</label>

                                {devList ? <Multiselect options={devList} displayValue="name" onSelect={MultipleDevSelect} ></Multiselect> : <span>loading user</span>}
                                {multiDevSel + ""}
                                <button className="inputBtn" onClick={addProject} >Add Project</button>


                            </Tab>
                            <Tab eventKey="MProject" >
                                <label className="inputLabel">Select Project</label>

                                {ProjList ? <Multiselect singleSelect={true} options={ProjList} displayValue="name" onSelect={MultipleProjSelect} ></Multiselect> : <span>loading Project</span>}
                                {multiProjSel + ""}
                                {console.warn(" ps " + multiProjSel)}
                                {
                                    multiProjSingSel._id ?
                                        <>
                                            <label className="inputLabel">Project Name</label>
                                            <input className="input" onChange={e => setPName(e.target.value)} value={projectName} defaultValue={ multiProjSingSel.name} placeholder="loading.."></input>
                                            <label className="inputLabel">Project Description</label>
                                            <input className="input" onChange={(e) => setPDesc(e.target.value)} value={projectDesc} defaultValue={ multiProjSingSel.desc} placeholder="loading.."></input>
                                            <label className="inputLabel">Project category</label>
                                            <input className="input" onChange={(e) => setPType(e.target.value)} value={projectType} defaultValue={ multiProjSingSel.catg} placeholder="loading.."></input>

                                            <label className="inputLabel">Select Status {multiStatusProjSel}</label>

                                            <Multiselect singleSelect={true} options={[{name:"comp"},{name:"incomp"},{name:"ovdue"}]} selectedValues={[{name:multiProjSingSel.pstatus}]} displayValue="name" onSelect={(e)=>setMStatusProj( e[0].name)} ></Multiselect>
                                          
                                            <label className="inputLabel">Select Deadline</label>
                                            <Calendar minDate={new Date()} onClickDay={(v, e) => setPDDate(v)}
                                                tileContent={({ date, view }) => view === 'month' && date.getDate() === (projectDeadline.getDate()) && date.getMonth() === (projectDeadline.getMonth()) && date.getFullYear() === (projectDeadline.getFullYear()) ? <p>Selected </p> : null}
                                            ></Calendar>
                                            <label className="inputLabel">Select Mangers</label>

                                            {MangList ? <Multiselect options={MangList} displayValue="name" selectedValues={MangPreList} onSelect={MultipleMangSelect} ></Multiselect> : <span>loading Mangers</span>}
                                            {multiMangSel + ""}

                                            <label className="inputLabel"> Select Developers</label>

                                            {devList ? <Multiselect options={devList} displayValue="name" selectedValues={DevlPreList} onSelect={MultipleDevSelect} ></Multiselect> : <span>loading user</span>}
                                            {multiDevSel + ""}
                                            <button className="inputBtn" onClick={modifyProject} >Modify  Project</button>
                                        </> : <p>select project</p>
                                }
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