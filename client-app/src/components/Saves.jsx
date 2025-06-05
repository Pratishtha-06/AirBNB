import React, { useContext,useState,useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';

function Saves(){
    const {click}=useContext(UserContext);
    const [saveplaces,setSavePlaces]=useState([]);

     useEffect(()=>{
          axios.get('https://airbnb-3o0c.onrender.com/account',{withCredentials:true})
          .then((response)=>{
            console.log(response.data);
            setSavePlaces(response.data);
          })
          .catch((err)=>{
            console.log("error:",err);
            
          })
       },[click]);
        
    return(
        <>
        <div className="px-3 pb-2 pt-4" style={{fontWeight:"bold", fontStyle:'italic', fontSize:'larger'}}>Your Saves</div>
        {
            saveplaces?.map(place=>(
                <div key={place._id}>
                    <div>{place.title}</div>
                </div>
            ))
            
    
        }
        </>
    )
}
export default Saves;