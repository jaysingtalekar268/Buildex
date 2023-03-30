import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap'
import { Button } from "bootstrap";

const Navbar = () => {

    const navigate = useNavigate();

    const auth = localStorage.getItem("user");


    return (
        <div class="navbar navbar-light bg-light position-">
            <div class="">
                <Link class='nav-item'><img src='/home/sdidd/Desktop/FSDProject/Buildex/client/public/logo512.jpg'></img></Link>
                <Link className="btn" to="/">Home</Link>
                <Link className="btn" to="/MyProject">MyProject</Link>
                <Link className="btn" to="/Message">Message</Link>
                <Link className="btn" to="/Profile">Profile</Link>
                {auth ? <Link className="btn" to='/Login' onClick={() => localStorage.clear()}>Logout</Link> : <Link className="btn" to='/Login' >Login</Link>}
            </div>
        </div>
    )
}

export default Navbar;