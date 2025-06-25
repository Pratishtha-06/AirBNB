import React, { useEffect, useState } from "react";
import '../App.css';
import ScreenSize from "./ScreenSize";
import { Link } from "react-router";
import { useEditor } from "@tiptap/react";
import Support from "./Support";

function Panel2(){
    const width = ScreenSize();
    const [show,setShow]=useState(false);
    
    useEffect(()=>{
        if(width < 800){
            setShow(false);
        }
    },[width])

    const head =(h)=>{return  <h6  className="m-0 text-truncate w-100">{h}</h6> }
    const result=(h)=>{
        return (
            <div className=" col-lg-2 col-md-4 col-sm-6 col-6 mb-4">
            {head(h)}
            </div>
        );
        }
    
        const handleClick =()=>{
            setShow(true);
            return{
                display:'none'
            }
        }

    return (
        <>
       
        <div className="row mt-5">
           {result('Amazing Pool')}
           {result('Artic')} 
           {result('Camper Vans')}
           {result('Camping')}
           {result('Castles')}
           {result('Containers')}
          
           <div className="show col-lg-2 col-md-4 col-sm-6 col-6 mb-4" 
                style={{display:(width < 800 && !show )?'':'none'}}
                onClick={handleClick}>  Show more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20px',height:'20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
           </div>
           
           {((width < 800 && show) || width>800) && (
           <>
           {result('Country Outside')}
           {result('Design')}
           {result('Earth Homes')}
           {result('National Park')}
           {result('Farms')}
           {result('Vineyards')}
           {result('Windmills')}
           {result('Lux')}
           {result('Towers')}
           {result('Tiny Houses')}
           </>
           )}
        </div>
        <div className="mt-5">
        <Support/>
        </div>
        </>
    )
}
export default Panel2;