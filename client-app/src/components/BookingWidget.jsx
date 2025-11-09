import React, {  useContext, useEffect, useState } from "react";
import {differenceInCalendarDays, set} from 'date-fns';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
 
function Booking({places}){
   const {user}=useContext(UserContext);
   const [checkIn,setCheckIn]=useState("");
   const [checkOut,setCheckOut]=useState("");
   const [numberOfGuest,setNumberOfGuest]=useState("");
   const [error,setError]=useState("");
   const [name,setName]=useState("");
   const [email,setEmail]=useState("");
   const [phone,setPhone]=useState("");
   const [redirect ,setRedirect] =useState(false);
   const [bookingId,setBookingId]=useState(null);
   const [log,setLog]=useState(false);

   let numOfNight=0;
   if (checkIn && checkOut){
    numOfNight = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
   }
   
   useEffect(()=>{
   if(checkIn && checkOut ){ 
     if(numOfNight <= 0){
        setError("Incorrect checkOut date");
     }}else{
        setError("");
   }  },[checkIn,checkOut,numOfNight])
   
   useEffect(()=>{
    if(user){
     setName(user.name);
    }
   },[user])

   const BookThis=async()=>{
      if(!user){
            alert("please login/register to book ");
            setLog(true);
      }
      if(!checkIn || !checkOut || !numberOfGuest || !name || !email || !phone){
            setError("Please fill all the details");
            return;
         }   
      try {
      const data = await axios.post('/bookings',{
         place : places._id,
         numberOfGuest,
         checkIn,
         checkOut,
         name,
         email,
         phone,
         price:numOfNight*places.price
       },{withCredentials:true});
         setBookingId(data.data._id);
         setRedirect(true);
        
      }catch(err){
         console.log("ERROR :",err);
         setError("Booking Failed. Please try again later.")
      }}

   if(redirect){ return  <Navigate to={`/account/bookings/${bookingId}`}/>}
   if(log){ return <Navigate to={`/login`}/>}


    return(
        <>
         <div className="bg-white d-flex flex-column justify-content-center align-items-center rounded-4" style={{width:'320px',height:'fit-content'}}>
                   <h5 className="px-3 pt-4 pb-2">Price: ${places.price}/-per night</h5>
                   <div className="d-flex flex-row mx-4 justify-content-center align-items-center" style={{borderRadius:'10px 10px 0px 0px',border:'1px solid black',padding:'5px 5px 12px 5px'}}>
                   <div >
                    <label className="fw-bold">Check in</label>
                    <input type="date"
                           value={checkIn}
                           onChange={(e)=>setCheckIn(e.target.value)} 
                           className="rounded-2 ps-1" 
                           style={{border:'1px solid black'}}></input>
                   </div>
                   <div style={{ border:'1px solid #797474',height:'50px',margin:'0px 5px'}}></div>
                   <div >
                    <label  className="fw-bold">Check out</label>
                    <input type="date" 
                           value={checkOut}
                           onChange={(e)=>setCheckOut(e.target.value)} 
                           className="rounded-2 ps-1" 
                           style={{border:'1px solid black'}} ></input>
                   </div>
                   </div>

                   <div className="mx-2" style={{padding:'7px 5px 12px 5px',border:"1px solid black",borderRadius:'0px 0px 10px 10px'}}>
                    <label  className="fw-bold">Number of guest</label>
                    <input type="number" 
                           value={numberOfGuest}
                           onChange={(e)=>setNumberOfGuest(e.target.value)} 
                           className="rounded-2 ps-2  w-100" 
                           style={{border:'1px solid black'}}></input>
                    {numOfNight > 0 && (
                        <>
                     <div style={{padding:'7px 0px 12px 0px'}}>
                        <label  className="fw-bold">Name</label>
                        <input type="text" 
                               placeholder="your full name"
                               value={name}
                               onChange={(e)=>setName(e.target.value)} 
                               className="rounded-2 ps-2 d-block  w-100" 
                               style={{border:'1px solid black'}}></input>
                    </div>
                    <div  style={{padding:'7px 0px 12px 0px'}}>
                        <label  className="fw-bold">Email</label>
                        <input  type="email"
                                placeholder="youremail@gmail.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)} 
                                className="rounded-2 ps-2 d-block  w-100" 
                                style={{border:'1px solid black'}}></input>   
                       </div>
                       <div  style={{padding:'7px 0px 12px 0px'}}>
                        <label  className="fw-bold">Phone No.</label>
                        <input type="number" 
                               placeholder="your mobile no."
                               value={phone}
                               onChange={(e)=>setPhone(e.target.value)} 
                               className="rounded-2 ps-2 d-block  w-100" 
                                style={{border:'1px solid black'}}></input>        
                                
                    </div>
                    </>
                    )}
                   
                  
                </div>
                 <button className="bg-danger border-0 rounded-5 mt-3 mb-1" 
                         style={{width:'290px' ,height:'30px',color:'white'}}
                         onClick={BookThis}>Book now</button>
                 {error && (<div style={{color:'red',fontSize:'small'}}>{error}</div>)}
                </div>
        </>
    )
}

export default Booking;