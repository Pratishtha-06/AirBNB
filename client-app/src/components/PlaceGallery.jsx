import React from "react";
import { useState } from "react";
import Images from './Images';

function Gallery({place}){
    const [show,setShow]=useState(false);
    if(show){
            return (
                <Images show={show} setShow={setShow}/>
            )
        }
    return (
        <>
           <div className="position-relative">
            <div className="row mb-3">
                <div className="col-md-8">
                    {place.photo?.[0] && 
                        <img src={`https://airbnb-3o0c.onrender.com/uploads/${place.photo[0]}`} 
                             onClick={()=>setShow(true)} 
                             className="w-100 p-1 h-100" 
                             style={{borderRadius:'25px 0px 0px 25px',cursor:'pointer'}}></img>
                    }
                </div>
                <div className="col-md-4 d-grid gap-0 row-gap-0 ">
                    {place.photo?.[1] && 
                        <img src={`https://airbnb-3o0c.onrender.com/uploads/${place.photo[1]}`} 
                             onClick={()=>setShow(true)} 
                             className="w-100 h-100 p-1" 
                             style={{borderRadius:'0px 25px 25px 0px',cursor:'pointer'}} ></img>
                    }
                    {place.photo?.[2] && 
                        <img src={`https://airbnb-3o0c.onrender.com/uploads/${place.photo[2]}`} 
                             onClick={()=>setShow(true)} 
                             className="w-100 p-1  h-100" 
                             style={{borderRadius:'0px 25px 25px 0px',cursor:'pointer'}}></img>
                    }

                </div>
            </div>
            <button className="position-absolute rounded-4 d-flex justify-content-center align-items-center" 
                    style={{right:'13px',bottom:'10px',backgroundColor:'white',border:'none',padding:'0px 5px',fontSize:'small'}}
                    onClick={()=>setShow(true)}
                    >
                      
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'20px',height:'15px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                        See more photos
            </button>
            </div>

        
        </>
    )
}
export default Gallery;