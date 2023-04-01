import { Navbar, Tabs, Tab } from 'react-bootstrap';
import './projectnavbar.css';
import ProjectManager from '../projectManager/projectManager';
import Dashboard from '../dashboard/dashboard';
import PCalendar from '../pcalendar/pcalendar';
import { useEffect } from 'react';
import Ptimeline from '../ptimeline/ptimeline';
import ProjectEmployee from '../projectEmployee/projectemployee';

function ProjectNavBar() {
    const auth = JSON.parse(localStorage.getItem("user"));
    return (
        <div className='projectNavBarMainDiv'>

            <Tabs className='projectNavBarMainTab' defaultActiveKey="Timeline">
                {auth.role == 'manager' ? <Tab className='projectNavBarItem' title="Project_manager" eventKey="Project_manager"><ProjectManager>    </ProjectManager> </Tab> : <Tab className='projectNavBarItem' title="project_employee" eventKey="project_employee"><ProjectEmployee></ProjectEmployee></Tab>}
                <Tab className='projectNavBarItem' title="Overview" eventKey="Overview"></Tab>
                <Tab className='projectNavBarItem' title="List" eventKey="List"></Tab>
                <Tab className='projectNavBarItem' title="Timeline" eventKey="Timeline"><Ptimeline></Ptimeline></Tab>
                <Tab className='projectNavBarItem' title="Calendar" eventKey="Calendar"> <PCalendar></PCalendar></Tab>
                <Tab className='projectNavBarItem' title="Dashboard" eventKey="Dashboard">
                    <Dashboard></Dashboard>
                </Tab>
                <Tab className='projectNavBarItem' title="More" eventKey="More"></Tab>
            </Tabs>
        </div>
    );
}


export default ProjectNavBar;