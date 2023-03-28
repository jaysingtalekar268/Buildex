import './dashboard.css'
import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
function Dashboard() {

    const username = JSON.parse(localStorage.getItem("user"));
    const [userProjectData, setUPdata] = useState("");
    const [compTask, setCTask] = useState(0);
    const [incoTask, setITask] = useState(0);
    const [overTask, setOTask] = useState(0);
    const getProject = async () => {
        let userProjectResult = await fetch("http://localhost:3001/getuserprojectstatus", {
            method: "post",
            body: JSON.stringify({
                name: username.name,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        // userProjectResult = await userProjectResult.json();
        userProjectResult = await userProjectResult.json();
        console.warn("before da " + userProjectResult);
        if (userProjectResult) {
            setUPdata(userProjectResult);
        }

        console.warn("after da " + userProjectData);
    };

    useEffect(() => {
        getProject();
       getProjectStatus();

    }, []);

    const getProjectStatus = () => {
        alert("its projectstaus");
        if (userProjectData[0]) {
            console.warn(" its if ");
            userProjectData.map(x => x.project_id.map(y => {

                console.warn("y  " + y.pstatus)
                if(y.pstatus=="comp")
                {

                    setCTask((compTask+1));
                }
                else  if(y.pstatus=="incomp")
                {
                    setITask(incoTask+ 1);
                }
                else  if(y.pstatus=="ovdue")
                {
                    setOTask(overTask+ 1);
                }

            }));

        }
        else
            {
                
            }
    };
    return (
        <div className='dashboardContainer'>
            <Card className='dashboardCard'>
                <Card.Body>
                    <Card.Title className='dashboardCardTitle'>Completed Tasks</Card.Title>
                    <span className='CompletedTaskCount' >{compTask}</span>

                </Card.Body>
            </Card>
            <Card className='dashboardCard'>
                <Card.Body>
                    <Card.Title className='dashboardCardTitle'>Incompleted Tasks</Card.Title>
                    <span className='CompletedTaskCount' >100</span>

                </Card.Body>
            </Card>
            <Card className='dashboardCard'>
                <Card.Body>
                    <Card.Title className='dashboardCardTitle'>Overdure Tasks</Card.Title>
                    <span className='CompletedTaskCount' >100</span>

                </Card.Body>
            </Card>
            <Card className='dashboardCard'>
                <Card.Body>
                    <Card.Title className='dashboardCardTitle'>Total Tasks</Card.Title>
                    <span className='CompletedTaskCount' >100</span>

                </Card.Body>
            </Card>

            <Card className='dashboardCardGraph'>
                <Card.Body>
                    <Card.Title className='dashboardCardTitle'>Incompleted task by section</Card.Title>
                    <span className='CompletedTaskCount' >100</span>

                </Card.Body>
            </Card>
            <Card className='dashboardCardGraph'>
                <Card.Body>
                    <Card.Title className='dashboardCardTitle'>All task by completion status</Card.Title>
                    <span className='CompletedTaskCount' >100</span>

                </Card.Body>
            </Card>

        </div>
    );
}

export default Dashboard;