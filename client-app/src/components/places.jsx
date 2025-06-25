import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import ProfileNav from "./ProfileNav";
import axios from 'axios';
import PlaceImg from "./PlaceImg";
import DOMPurify from 'dompurify';
import OOPS from '../assets/balloon.png';



function Places(){
  const [places,setPlaces]=useState([]);
  useEffect(()=>{
   axios.get('/user-places')
   .then(({data})=>{
      setPlaces(data);
   })
  },[])
   

  return(
        <>
        <ProfileNav/>
       
        <div className="d-flex flex-column justify-content-center align-items-center" style={{width:'98%'}}>
        <Link to={'/account/places/new'} className="text-decoration-none text-white bg-danger rounded-5 py-2 px-2 " >
          <svg xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               strokeWidth="1.5" 
               stroke="currentColor" 
               className="Plus-icon">
          <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
           Add new places</Link>
           <div className="fw-bold fs-5 fst-italic mt-3">List of all added places</div>

           {places.length > 0 ?( places.map((place,index)=>
             <Link to={'/account/places/'+place._id}  key={index} className="desc">

              <div className="bg-light" style={{width:'210px',height:'180px',margin:'10px',flexShrink:0}}>
              <PlaceImg place={place}/>
              </div> 
              
              <div className="d-flex flex-column">
               <div className="fw-bold fs-5">{place.title}</div>
               <div className="scroll" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(place.description)}}></div>
              </div> 
             </Link>
           )):(
            <div style={{textAlign:'center',marginTop:'30px'}}>
                      <img src={OOPS} style={{width:'45px',height:'45px'}}/>
                      <div>You haven't added anything</div>
            </div>
           )}
        </div>
       

        </>
    )
}
export default Places;