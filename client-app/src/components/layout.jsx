import React, { useContext } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

function Layout(){
    const {ready} =useContext(UserContext);
    return(
        <>
        <div className="ms-2 me-2 mt-3">
        <Header/>
        {!ready && (<div className="d-flex justify-content-center align-items-center Loading" style={{marginTop:'50px'}}><div className="mx-1 LoadingSpin"></div>Loading....</div>)}
        {ready && (<Outlet/>)}
         </div>
        
        </>
    )
}
export default Layout;