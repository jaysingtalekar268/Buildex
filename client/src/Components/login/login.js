import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Container, Button, Tabs, Tab } from 'react-bootstrap';

function Login() {

    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    const [nameWarn, setNwarn] = useState("");
    const [passWarn, setPwarn] = useState("");

    const [tabKey, setTab] = useState('login');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    });
    const login = async () => {
        let loginStatus = await fetch("http://localhost:3001/Login", {
            method: "post",
            body: JSON.stringify({
                "name": name,
                "password": pwd
            }),
            headers: {
                'Content-type': 'application/json'
            }

        })

        loginStatus = await loginStatus.json();
        console.warn(loginStatus);

        if (loginStatus.name) {
            localStorage.setItem("user", JSON.stringify(loginStatus));
            navigate("/");
        }
       
    };


    const register = async () => {
        let registerStatus = await fetch("http://localhost:3001/useradd", {
            method: "post",
            body: JSON.stringify({
                "name": name,
                "password": pwd,
                "phone":phone,
                "email":email,
                "role":role
            }),
            headers: {
                'Content-type': 'application/json'
            }

        })

        registerStatus = await registerStatus.json();
        console.warn(registerStatus);

        if (registerStatus.name) {
            {
                setTab("login");
            // navigate("/");
            }
        }
    };



    const CheckInput = () => {
        // alert('You clicked me!');

        let nPass = false;
        let pPass = false;
        if (name.length == 0)
            setNwarn("Please enter Username");
        else {
            setNwarn("");
            nPass = true;
        }
        if (pwd.length == 0)
            setPwarn("Please enter Password");
        else {
            setPwarn("");
            pPass = true;
        }

        if (nPass && pPass) {
            if(tabKey=="login")
            {
            login();
            }
            else if(tabKey=="register")
            {
                register();
            }

        }

    };


    return (

        <Container className='formContainer'>
            <Tabs id="controlled-tab-example"
                activeKey={tabKey}
                onSelect={(k) => setTab(k)}
                className="mb-3">
                <Tab eventKey="login" >
                    <input className='formInput' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Username'></input>
                    <span className='formWarn'>{nameWarn}</span>
                    <input className='formInput' onChange={(e) => setPwd(e.target.value)} type="text" placeholder='Enter Password'></input>
                    <span className='formWarn'>{passWarn}</span>
                    <a className='formInput' onClick={() => setTab("register")}>New to Buildex?</a>
                    <button onClick={CheckInput}>Login</button>

                </Tab>
                <Tab eventKey="register">
                    <input className='formInput' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Username'></input>
                    <span className='formWarn'>{nameWarn}</span>
                    <input className='formInput' onChange={(e) => setPwd(e.target.value)} type="text" placeholder='Enter Password'></input>
                    <span className='formWarn'>{passWarn}</span>
                    <input className='formInput' onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter Email'></input>
                    <span className='formWarn'>{passWarn}</span>
                    <input className='formInput' onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Enter Phone'></input>
                    <span className='formWarn'>{passWarn}</span>
                    <input className='formInput' onChange={(e) => setRole(e.target.value)} type="text" placeholder='Enter Role'></input>
                    <span className='formWarn'>{passWarn}</span>
                    <a className='formInput' onClick={() => setTab("login")}>Already have account</a>
                    <button onClick={CheckInput}>Register</button>
                </Tab>
            </Tabs>

        </Container>

    );

};
export default Login;