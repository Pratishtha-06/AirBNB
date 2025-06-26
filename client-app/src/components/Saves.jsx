import React, { useContext,useState,useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

function Saves(){
    const {click}=useContext(UserContext);
    const [saveplaces,setSavePlaces]=useState([]);
    const {id} = useParams();
    const {liked,setLiked} = useContext(UserContext);

     useEffect(()=>{
          axios.get('/account',{withCredentials:true})
          .then((res)=>{
            const savedIds = res.data.saves;
            console.log("saves:",savedIds);
            
            setSavePlaces(savedIds);

          })
          .catch((err)=>{
            console.log("error:",err);
          })
       },[id]);
        
    return(
        <>
        <div className="px-3 pb-2 pt-4" style={{fontWeight:"bold", fontStyle:'italic', fontSize:'larger'}}>Your Saves</div>
         <div className="row" style={{margin:'20px 0px 20px 5px'}}>
        {
           saveplaces?.length >0 ?(saveplaces.map(place=>(
                <Link to={`/places/${place._id}`} key={place._id}  
                      className="text-decoration-none col-lg-3 col-md-4 col-6 text-dark ">
                    <div className="w-100" style={{height:'90%'}}>
                    <img src={`https://airbnb-3o0c.onrender.com/uploads/${place.photo[0]}`} alt="pic"
                         style={{borderRadius:'15px',width:'100%',height:'100%'}}/>
                    </div>
                    <h6>{place.title}</h6>     
                     
                </Link>
            ))
        ):(
         <div style={{textAlign:'center',marginTop:'30px',paddingBottom:'70px'}}>
          No Saves
        </div>
        )}
        </div>
        </>
    )
}
export default Saves;