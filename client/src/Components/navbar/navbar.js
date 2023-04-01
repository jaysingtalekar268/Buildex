import React, { useEffect }  from "react";
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css';
const Navbar=()=>
{   
   
    const navigate = useNavigate();
    
        const auth =localStorage.getItem("user") ;
       
    
    return (
        <nav className="Navbar">
            <ul className="NavbarList">
                <li><Link className="NavbarLink"  to="/">Home</Link></li>

                <li><Link className="NavbarLink" to="/MyProject">MyProject</Link></li>
                {/* <li><Link className="NavbarLink" to="/Message">Message</Link></li> */}
                <li><Link className="NavbarLink" to="/Profile">Profile</Link></li>
                <li> { auth? <Link className="NavbarLink" to='/Login' onClick={()=>localStorage.clear()}>Logout</Link> : <Link className="NavbarLink" to='/Login' >Login</Link> }</li>
                {/* <li><Link className="NavbarLink" to="/Login">Login</Link></li> */}

            </ul>
        </nav>
    );
}

export default Navbar;