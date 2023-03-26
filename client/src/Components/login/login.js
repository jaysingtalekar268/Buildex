import './login.css';
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Container,Button } from 'react-bootstrap';

function Login() {

    const [name, setName] = useState("");

    const [pwd, setPwd] = useState("");
    const [nameWarn, setNwarn] = useState("");
    const [passWarn, setPwarn] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
      const  auth=localStorage.getItem("user") ;
        if (auth) {
            navigate("/");
        }
    });
    const login =async ()=>{
        let loginStatus=await fetch("http://localhost:3001/Login",{
            method:"post",
            body: JSON.stringify({
                "name":name,
                "password":pwd
            }),
            headers: {
                'Content-type': 'application/json'
            }

        })

        loginStatus= await loginStatus.json();
        console.warn(loginStatus);

        if(loginStatus.name)
        {
            localStorage.setItem("user",JSON.stringify(loginStatus));
            navigate("/");
        }
    };

    

    const CheckInput = () => {
        // alert('You clicked me!');

        let nPass=false;
        let pPass=false;
        if(name.length==0)
        setNwarn("Please enter Username");
        else{
            setNwarn("");
            nPass=true;
        }
        if(pwd.length==0)
        setPwarn("Please enter Password");
        else{
            setPwarn("");
            pPass=true;
        }

        if(nPass && pPass)
        {
            login();
        }

    };
   
     
    return (
        
        <Container className='formContainer'>
            <input className='formInput' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Username'></input>
            <span className='formWarn'>{nameWarn}</span>
            <input className='formInput' onChange={(e) => setPwd(e.target.value)}  type="text" placeholder='Enter Username'></input>
            <span className='formWarn'>{passWarn}</span>
            <button onClick={CheckInput}>Login</button>;
        </Container>
        
    );

};
export default Login;