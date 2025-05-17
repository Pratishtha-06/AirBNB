import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "./BookingWidget";
import Gallery from "./PlaceGallery";
import DOMPurify from 'dompurify' ;
import ColoredHeart from '../assets/heart.png';
import Heart from '../assets/coloredheart.png'
import { UserContext } from "./UserContext";

function SinglePage(){
    const {id} =useParams();
    const [place,setPlace]=useState(null);
    const {click,setClick}=useContext(UserContext);
    const [isSaved,setSaved]=useState(false);
    
   
    useEffect(()=>{
        if(!id) return ;
        axios.get(`/places/${id}`)
        .then((response)=>{
            setPlace(response.data);
        })
    },[id])
    if(!place){ return ''}
    
    const sanitizeDes = DOMPurify.sanitize(place.description);
    const sanitizeInfo = DOMPurify.sanitize(place.extraInfo);
    
    const handleClick=async()=>{
      try{
      setClick(!click);
      await axios.post('/saves',{placeId : id})
      }catch(err){
        console.log("Error:",err);
      }
    }
   
    return(
        <>
        <div className="container" style={{backgroundColor:'rgba(231,236,240,1)'}}>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div>
                <h4 className="mx-3 pt-4">{place.title}</h4>
                <a target="blank" href={`https://maps.google.com/?q=${place.address}`} style={{textDecorationColor:"black",display:'flex'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'18px',height:'18px',color:'black',marginLeft:'8px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <h6  className=" text-black ">{place.address}</h6>
                </a>
              </div>
            <div>
                <img src={click ? ColoredHeart : Heart} onClick={handleClick}
                     style={{width:'25px',height:'25px',marginRight:'10px'}}/>
            </div>
           </div>
            
         <Gallery place={place}/>

            <div className="mx-3" style={{paddingBottom:'10px'}}>
            <div className="mb-3 mt-2 d-flex" style={{justifyContent:'space-between'}}>
                
                <div> 
                  <h4 className="mb-0">Description</h4>
                  <div className="me-4" dangerouslySetInnerHTML={{__html:sanitizeDes}} style={{fontSize:'20px'}}></div>

                  <div className="mt-2">
                     Check-in : {place.checkIn}<br/>
                     Check-out : {place.checkOut}<br/>
                     Max-Guest : {place.maxGuest}
                  </div>
                </div>
                
                <Booking places={place}/>
                </div>

                <h4 className="mb-0 ps-1 bg-white py-2 ps-2" style={{borderRadius:'8px 8px 0px 0px'}}>Extra Info</h4>
                <div className="bg-white px-2 pb-1" style={{borderRadius:'0px 0px 8px 8px'}} 
                     dangerouslySetInnerHTML={{__html:sanitizeInfo}}></div>

            </div>
        </div>
        </>
    )
}
export default SinglePage;