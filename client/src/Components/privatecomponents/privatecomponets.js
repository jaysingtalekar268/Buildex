import React from "react";
import { Navigate,Outlet } from "react-router-dom";;

function  PrivateComponent()
{
    const auth = localStorage.getItem("user");
    return auth? <Outlet></Outlet>:<Navigate to="/Login"></Navigate>
    
}

export default PrivateComponent;