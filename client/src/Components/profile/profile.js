import { useEffect, useState } from "react";
import { Container, Tabs, Tab, Col, Row } from "react-bootstrap";


function Profile() {

    const username = JSON.parse(localStorage.getItem("user"));
    
    const [tabKey, setTab] = useState("personal");
   
    const [UName,setUName] = useState("")
    const [UEmail,setUEmail] = useState("")
    const [UPhone,setUPhone] = useState("")
    const [UPwd,setUPwd] = useState("")
    
    const [UData,setUData]= useState("");
    
    
    const getuserdetails  = async () =>
    {
        let userdata = await fetch("http://localhost:3001/getuseraccount",{
            method: 'post',
            body: JSON.stringify({
               _id:username._id
                
               
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

         userdata = await userdata.json();

        if(userdata)
        {
            setUData(userdata);
            setUName(userdata.name);
            setUEmail(userdata.email);
            setUPhone(userdata.phone);
        }

    };

    const modifyDetails = async () =>
    {
        let modifyResult = await fetch("http://localhost:3001/usermodify",{
            method: 'post',
            body: JSON.stringify({
               _id:username._id,
                name:UName,
                phone:UPhone,
                email:UEmail

               
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        modifyResult = await modifyResult.json();

        if(modifyResult)
        {
           alert("Details modified");
        }

    };
    const modifyPwd = async () =>
    {
        if(UPwd.length==0)
        {
            alert(" Enter Password");
        }
        else
        {
        let modifyResult = await fetch("http://localhost:3001/usermodify",{
            method: 'post',
            body: JSON.stringify({
               _id:username._id,
                password:UPwd
               
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        modifyResult = await modifyResult.json();

        if(modifyResult)
        {
           alert("password modified");
        }
    }

    };

    useEffect(() => {
        getuserdetails();
    }, []);

    return (

        <Container className="mainContainer">
            <Row>
                <Col className="accountMenu" lg={1}>
                    <ul>
                        <li className="menuItem"><a className="menuLink" onClick={() => setTab("personal")}> Personal </a></li>
                        <li className="menuItem"><a className="menuLink" onClick={() => setTab("security")}> security </a></li>
                    </ul>
                </Col>
                <Col className="accountMenuInfo">
                    <Container>
                        <Tabs activeKey={tabKey}>
                            <Tab eventKey="personal" >
                                {
                                UData._id?
                                <>
                                <label className="inputLabel">User Name</label>
                                <input className="input" onChange={e => setUName(e.target.value)} value={UName} defaultValue={UData.name} placeholder="loading.."></input>
                               
                                <label className="inputLabel">User Email</label>
                                <input className="input" onChange={e => setUEmail(e.target.value)} value={UEmail} defaultValue={UData.email} placeholder="loading.."></input>
                             
                                <label className="inputLabel">User Phone</label>
                                <input className="input" onChange={e => setUPhone(e.target.value)} value={UPhone} defaultValue={UData.phone} placeholder="loading.."></input>
                                <button className="inputBtn" onClick={modifyDetails} >Chnage Details</button>
                                </>: <p>loading data</p>
                                }
                            </Tab>
                            <Tab eventKey="security" >
                            {
                                UData._id?
                                <>
                                
                                <label className="inputLabel">Enter New  Password</label>
                                <input className="input" onChange={e => setUPwd(e.target.value)} value={UPwd} defaultValue={"Enter New Password"} placeholder={"Enter New Password"}></input>
                                {UPwd}
                                <button className="inputBtn" onClick={modifyPwd} >Chnage Password</button>

                                </>: <p>loading data</p>


                                }
                            </Tab>
                            <Tab eventKey="DProject" >


                            </Tab>
                        </Tabs>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;