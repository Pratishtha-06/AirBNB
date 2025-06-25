import React, { useEffect, useState } from "react";
import '../App.css';
import ScreenSize from "./ScreenSize";
import { Link } from "react-router";
import { useEditor } from "@tiptap/react";
import Support from "./Support";

function Panel(){
    const width = ScreenSize();
    const [show,setShow]=useState(false);
    
    useEffect(()=>{
        if(width < 800){
            setShow(false);
        }
    },[width])

    const head1 =(h1)=>{return  <h6  className="m-0 text-truncate w-100">{h1}</h6> }
    const head2=(h2)=>{return <h6 className="head text-truncate">{h2}</h6>}
    const result=(h1,h2)=>{
        return (
            <div className=" col-lg-2 col-md-4 col-sm-6 col-6 mb-4">
            {head1(h1)}
            {head2(h2)}
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
           {result('Yurt Rental' , 'United States')}
           {result('Yurt Rental','United Kingdom')} 
           {result('Castle Rental','United States')}
           {result('Houseboats','United States')}
           {result('Holiday Caravans','United Kingdom')}
           {result('Private Island Rental','United States')}
          
           <div className="show col-lg-2 col-md-4 col-sm-6 col-6 mb-4" 
                style={{display:(width < 800 && !show )?'':'none'}}
                onClick={handleClick}>  Show more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20px',height:'20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
           </div>
           
           {((width < 800 && show) || width>800) && (
           <>
           {result('Farm House' , 'United States')}
           {result('Farm Cottages','United Kingdom')} 
           {result('Cabin Rental','Australia')}
           {result('Luxury Cabins','United Kingdom')}
           {result('Mansion Rentals','United States')}
           {result('Banglow Rental','United States')}
           {result('Beach Cabins','United States')}
           {result('Beach Houses','United Kingdom')}
           {result('Beach Villa','United Kingdom')}
           {result('Dog Friendly Cottages','United Kingdom')}
           {result('Pet Friendly Beaches Rental','United States')}
           {result('Appartment with Hot Tub','United States')}
           </>
           )}
        </div>
        <div className="mt-5">
        <Support/>
        </div>
        </>
    )
}
export default Panel;