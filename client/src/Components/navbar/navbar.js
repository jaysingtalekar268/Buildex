import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
const Navbar = () => {

    const navigate = useNavigate();

    const auth = localStorage.getItem("user");


    return (
        <div class="navbar navbar-dark bg-primary sticky-top">
            <div class="me-auto">
                <Link class='nav-item'><img src='/home/sdidd/Desktop/FSDProject/Buildex/client/public/logo512.jpg'></img></Link>
                <Link class=" btn " to="/">Home</Link>
                <Link class="btn" to="/MyProject">MyProject</Link>
                {/*<Link className="btn" to="/Message">Message</Link>*/}
                <Link class="btn" to="/Profile">Profile</Link>
                {auth ? <Link className="btn" to='/Login' onClick={() => localStorage.clear()}>Logout</Link> : <Link className="btn" to='/Login' >Login</Link>}
            </div>
        </div>
    );
}

export default Navbar;