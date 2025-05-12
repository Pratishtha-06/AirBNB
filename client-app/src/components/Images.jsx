import React, { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Images({show,setShow}){
    const {id} =useParams();
    const [data,setData]=useState(null);
    
    useEffect(()=>{
        if(!id) return ;
        axios.get(`/places/${id}`)
        .then((response)=>{
            setData(response.data);
        })
    },[id])
    if(!data){ return ''}

    const Close=()=>{
          setShow(false);
    }

    return (
        <>
        {show && (
          <div className="bg-dark d-flex flex-column justify-content-center align-items-center" style={{position:'relative',bottom:'100px',width:'100%'}}>
            <div className="w-100 px-4 py-2" style={{justifyContent:'center',alignItems:'center'}}>
                 <button onClick={Close} className="bg-dark" style={{border:'none'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{color:'white',width:'30px' ,height:'30px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                 </button>
            </div>
            <h6 className="text">{data.title}</h6>
            {
             data?.photo?.length > 0 && data.photo.map((img,index)=>(
                <img  key={index} src={`http://localhost:4000/uploads/${img}`} 
                      className="w-75 h-75 m-2"></img>
             ))}
           </div>
        )}
        </>
    )
}

export default Images;