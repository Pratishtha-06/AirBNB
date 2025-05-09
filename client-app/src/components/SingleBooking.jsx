import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import Gallery from "./PlaceGallery";
import { Link } from "react-router-dom";


function SingleBooking (){
    const {id} =useParams();
    const [booking,setBooking]=useState('');
    

    useEffect(()=>{
        axios.get('/bookings').then((response)=>{
           if(id){ 
           const foundData =response.data
           const found=foundData.find(({_id})=> _id === id);
           if(found){
            setBooking(found);
           }}})
    },[id])
    if(!booking) return '';

    const PayNow=async()=>{
      const  foundData = {email ,phone, price:booking.price};
      getCheckS
    }


    return (
    <>
     <div className="w-100">
        <div className="ms-2 d-flex mt-3 align-items-center rounded-4" style={{backgroundColor:'rgba(231,236,240,1)' ,justifyContent:'space-between',padding:'10px 15px 5px 10px'}}>
            <div>
            <h4 className="ps-3 mb-0">{booking.place.title}</h4>
            <div className="d-flex justify-content-center align-items-center"> 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'18px',height:'18px',color:'black',marginLeft:'8px'}}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
               </svg>
               <Link to={`https://maps.google.com/?q=${booking.place.address}`}
                     style={{color:"black" }} >
                 {booking.place.address}
               </Link>
            </div>
            
            </div>
            <div>
                <button className="bg-danger text-white rounded-3"
                        onClick={PayNow} 
                        style={{width:'130px',height:'50px',border:'none'}}>
                            Reserve Now :<div>${booking.price}</div>
                </button>
            </div>
        </div>
        <div >
        <Gallery place={booking.place} />
        </div>
    
    
    </div>
   
    
    </>
    )
}

export default SingleBooking;