import './login.css';
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
                "phone": phone,
                "email": email,
                "role": role
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
            if (tabKey == "login") {
                login();
            }
            else if (tabKey == "register") {
                register();
            }

        }

    };


    return (

        <div className='text-center position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded bg-info'>
            <Tabs id="controlled-tab-example"
                activeKey={tabKey}
                onSelect={(k) => setTab(k)}
                className="">
                <Tab eventKey="login" class='card shadow text-center vw-50 vh-50'>
                    <label>Your Username</label>
                    <input class='form-text' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Username'></input>
                    <div class='text-warning'>{nameWarn}</div>
                    <label>Your Password</label>
                    <input class='form-text' onChange={(e) => setPwd(e.target.value)} type="password" placeholder='Enter Password'></input>
                    <div class='text-warning align-items-md-end'>{passWarn}</div>
                    <div><a class='link' onClick={() => setTab("register")}>New to Buildex?</a></div>
                    <div class='btn btn-light btn-lg align-middle align-self-center ' onClick={CheckInput}>Login</div>
                </Tab>
                <Tab eventKey="register" class='card text-center shadow vw-50 vh-50'>
                    <label>Your Username</label>
                    <input className='form-text' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Username'></input>
                    <div class='text-warning align-items-md-end'>{nameWarn}</div>
                    <label>Your Password</label>
                    <input className='form-text' onChange={(e) => setPwd(e.target.value)} type="text" placeholder='Enter Password'></input>
                    <div class='text-warning align-items-md-end'>{passWarn}</div>
                    <label>Your Email</label>
                    <input className='form-text' onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter Email'></input>
                    <div class='text-warning align-items-md-end'>{passWarn}</div>
                    <label>Your Phone</label>
                    <input className='form-text' onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Enter Phone'></input>
                    <div class='text-warning align-items-md-end'>{passWarn}</div>
                    <label>Your Role</label>
                    <input className='form-text' onChange={(e) => setRole(e.target.value)} type="text" placeholder='Enter Role'></input>
                    <div class='text-warning align-items-md-end'>{passWarn}</div>
                    <div><a class='link' onClick={() => setTab("login")}>Already have account</a></div>
                    <button div class='btn btn-light btn-lg align-middle align-self-center ' onClick={CheckInput}>Register</button>
                </Tab>
            </Tabs>

        </div>

    );

};
export default Login;