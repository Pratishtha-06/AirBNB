import  { useEffect, useContext ,useState} from "react";
import { UserContext } from "./UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./places";
import ProfileNav from "./ProfileNav";
import Saves from "./Saves";

function AccountPage(){
    const {ready,user,setUser}=useContext(UserContext);
    const {id}=useParams();
    const{subpage}=useParams();
    const [redirect,setRedirect]=useState(null);
    
    async function logout(){
      await axios.post('/logout');
      setUser("");
      setRedirect('/');
    }
    
    if(!ready){
        return<div className="d-flex justify-content-center align-items-center Loading"><div className="mx-1 LoadingSpin"></div>Loading....</div>
    }
    
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

   if(redirect){
    return <Navigate to={'/'}/>
   }
  
   return(
    <>
    <ProfileNav/>

     { subpage === undefined && (
      <>
        <div style={{border:'1px solid grey',borderRadius:'7px'}}>
     <div className="d-flex flex-column  logbox">
        <div className="px-3 pb-2 pt-4" style={{fontWeight:"bold", fontStyle:'italic', fontSize:'larger'}}>Login Info</div>
        <div className=" pt-2 ps-3 mt-2" style={{fontSize:'large'}}>User name :</div>
        <div className="ud-1 pt-2 ps-2"> {user.name}</div>
        <div className=" pt-2 ps-3 mt-3 " style={{fontSize:'large'}}>Logged in as :</div>
        <div className="ud-2 pt-2 ps-2">{user.email}</div>
        <button className="btn btn-danger my-3 mx-3" style={{width:'80px'}} onClick={logout}>Logout</button>
     </div> 
     </div>
     <div style={{border:'1px solid grey',borderRadius:'7px',marginTop:'10px'}}>
     <Saves/>
     </div>
      </>
     )}
     { subpage === 'places' && (
        <Places/>
     )}
    </>
   )
}
export default AccountPage;