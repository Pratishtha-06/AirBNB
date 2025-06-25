import React, { useContext } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import Footer from "./Footer";

function Layout(){
    const {ready} =useContext(UserContext);
    const {pathname} = useLocation();

    return(
        <>
        <div className="ms-2 me-2">
        <Header/>
        {!ready && (<div className="d-flex justify-content-center align-items-center Loading" style={{margin:'50px 0px'}}><div className="mx-1 LoadingSpin"></div>Loading....</div>)}
        {ready && (<Outlet/>)}
        {(pathname == '/')&& (
            <Footer/>
        )}
         </div>
        
        </>
    )
}
export default Layout;