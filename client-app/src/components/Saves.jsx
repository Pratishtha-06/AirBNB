import React, { useContext,useState,useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';

function Saves(){
    const {click}=useContext(UserContext);
    const [saveplaces,setSavePlaces]=useState([]);

     useEffect(()=>{
          axios.get('/account',{withCredentials:true})
          .then((response)=>{
            console.log(response.data.Saves);
            setSavePlaces(response.data.Saves);
          })
          .catch((err)=>{
            console.log("error:",err);
          })
       },[click]);
        
    return(
        <>
        <div className="px-3 pb-2 pt-4" style={{fontWeight:"bold", fontStyle:'italic', fontSize:'larger'}}>Your Saves</div>
        {
           saveplaces?.length >0 ?(saveplaces.map(place=>(
                <div key={place._id}>
                    <div>{place.title}</div>
                </div>
            ))
        ):(
         <div style={{textAlign:'center',marginTop:'30px',paddingBottom:'70px'}}>
          No Saves
        </div>
        )}
        </>
    )
}
export default Saves;