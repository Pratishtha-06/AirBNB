import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import {differenceInCalendarDays, format} from 'date-fns';
import { Link } from "react-router-dom";
import OOPS from '../assets/balloon.png';

function BookingPage (){
   
   const [booking,setBooking]=useState([]);
   useEffect(()=>{
       axios.get('/bookings',{withCredentials:true})
       .then((response)=>{
       setBooking(response.data);
       })
   },[])
    return (
    <>
       <ProfileNav/>
       
       {booking?.length > 0 ?( booking.map((book,index)=>{
        return (
          <Link key={index} 
                to={`/account/bookings/${book._id}`}
                className="w-100 d-flex" 
                style={{backgroundColor:' rgba(231,236,240,1)',borderRadius:'18px',textDecoration:'none',color:'black',margin:'10px 0px 15px 0px'}}>
            
            <div style={{width:'25%',borderRadius:'18px' }}>
              <PlaceImg place={book.place} style={{borderRadius:'18px 0px 0px 18px'}} />
            </div>

            <div className="mt-2 ms-3 w-75">
             <h4> {book.place.title}</h4>
             <div style={{border:'1px solid black',width:'99%',borderRight:'transparent',borderLeft:'transparent',borderBottom:'transparent',paddingTop:'10px'}}>
             From <span className="fw-bold d-inline align-items-center mx-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'20px' ,height:'20px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                  </svg>
                  {format (new Date(book.checkIn),'yyyy-MM-dd')} 
                  </span> to <span className="fw-bold d-inline align-items-center mx-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'20px' ,height:'20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
               {format (new Date(book.checkOut),'yyyy-MM-dd')}
               </span>

             <div className="mt-2 d-flex ">
                <div className="d-flex flex-column">
                  <div className="d-flex  align-items-center" style={{color:'gray'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'20px' ,height:'20px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    {differenceInCalendarDays (new Date(book.checkOut),new Date(book.checkIn))} Nights  
                    {book.numberOfGuest > 1 && (<div className="guest">{book.numberOfGuest} guests</div>)}
                    {book.numberOfGuest <= 1 && (<div className="guest">{book.numberOfGuest} guest</div> )} 
                  </div>
                  
                  <h6 className="mt-5"> Total price: ${book.price}</h6>
                </div>
             </div>  
             </div>
            </div>
             
          </Link>
      )})):(
        <div style={{textAlign:'center',marginTop:'30px'}}>
          <img src={OOPS} style={{width:'45px',height:'45px'}}/>
          <div>No Bookings</div>
        </div>
      )}
      
    
    </>
    )
}

export default BookingPage;