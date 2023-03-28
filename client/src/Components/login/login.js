import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function Login() {

    const [name, setName] = useState("");

    const [pwd, setPwd] = useState("");
    const [nameWarn, setNwarn] = useState("");
    const [passWarn, setPwarn] = useState("");
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



    const CheckInput = () => {
        // alert('You clicked me!');

        let nPass = false;
        let pPass = false;
        if (name.length === 0)
            setNwarn("Please enter Username");
        else {
            setNwarn("");
            nPass = true;
        }
        if (pwd.length === 0)
            setPwarn("Please enter Password");
        else {
            setPwarn("");
            pPass = true;
        }

        if (nPass && pPass) {
            login();
        }

    };


    return (
        <div class="card mx-auto container-md align-middle shadow p-3 mb-5 bg-body rounded">
            <div class="card-body align-content-center text-center align-middle">
                <input class='form-text' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Username'></input>
                <div class='text-warning'>{nameWarn}</div>
                <input class='form-text' onChange={(e) => setPwd(e.target.value)} type="password" placeholder='Enter Password'></input>
                <div class='text-warning align-items-md-end'>{passWarn}</div>
                <div class='btn btn-primary bg-gradient align-middle align-self-center ' onClick={CheckInput}>Login</div>
            </div>
        </div>
    );

};
export default Login;