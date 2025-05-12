import React, { useEffect } from "react";
import Perks from './Perks';
import axios from 'axios';
import { useState } from "react";
import ProfileNav from "./ProfileNav";
import { Navigate, useParams } from "react-router";
import RichTextEditor from "./RichTextEditor";


function PlaceForm(){
      const {id}=useParams();
      
      const [title,setTitle]=useState("");
      const [address,setAddress]=useState("");
      const [photolink,setPhotoLink]=useState('');
      const [photo,setPhoto]=useState([]);
      const [description,setDescription]=useState('');
      const [perk,setPerk]=useState([]);
      const [extraInfo,setExtraInfo]=useState("");
      const [checkin,setCheckIn]=useState("");
      const [checkout,setCheckOut]=useState("");
      const [maxGuest,setMaxGuest]=useState(1);
      const [price,setPrice]=useState(100);
      const [redirect,setRedirect]=useState(false);

      useEffect(()=>{
        if(!id){return};
        axios.get('/places/'+id).then(response=>{
          const {data} =response;
          console.log(response);
          
          
          setTitle(data.title);
          setAddress(data.address);
          setPhoto(data.photo);
          setDescription(data.description);
          setPerk(data.perk);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuest(data.maxGuest || 1);
          setPrice(data.price);
         })
       },[id])

      const Input=(title)=>{  return <h4 className="mb-0 mt-3 ">{title}</h4> }
      const desc=(des)=>{  return  <div className="ps-1" style={{fontSize:'small', width: '100%' }}>{des}</div> }
      const Output=(title,des)=>{ 
           return <>
                   {Input(title)}
                   {desc(des)}
                  </> }
      
      const photobyLink= async (e)=>{
          e.preventDefault(); 
          const {data :filenames} = await  axios.post('/upload-by-link', {link : photolink})
          setPhoto(prev => {
            return [...prev, filenames]});
          setPhotoLink('');
          }   
           
      const SavePlace= async (e)=>{
            e.preventDefault();
            const placedata = {title , address, photo, description,
              perk,extraInfo,  checkin,checkout,maxGuest,price}
            if(id){
              await axios.put(`/places/`,{id,...placedata});
              setRedirect(true); 
            }else{
              //new place 
              await axios.post('/places',placedata);
              setRedirect(true);
             }}      
            if(redirect){
              return <Navigate to={'/account/places'}/>
            }
      
      const  uploadPhoto= async(e)=>{
        const files=e.target.files;
        const data =new FormData();
        for (let i=0; i<files.length; i++){
        data.append('photos',files[i]);
        }
        await axios.post('/uploads' ,data, {
          headers:{"Content-Type":"multipart/form-data"},
        }).then((response)=>{
          const {data:filenames} =response;
          setPhoto(prev => {
            return [...prev,...filenames]});
          })
      }
    
     const removePhoto=(e,filename)=>{
      e.preventDefault();
       setPhoto([...photo.filter(photo=>photo!=filename)]);
     } 

     const MainPhoto=(e,filename)=>{
      e.preventDefault();
      const newPhoto=[filename,...photo.filter(photos =>photos !== filename)];
      setPhoto(newPhoto);
      
     }

   return (
    <>
    <ProfileNav/>
          <div className="ms-4 mt-5">
          <form onSubmit={SavePlace}>
            {Output('Title','Title for you place should be short and catchy as an advertisment')}
            <input placeholder="Title eg.The Wing apt." 
                   value={title}
                   onChange={(e)=>setTitle(e.target.value)}
                   type="text" 
                   className="rounded-3 ps-2 border-1 photos w-100"></input>


            {Output('Address','Address of the place')}
            <input placeholder="address" 
                   value={address}
                   onChange={(e)=>setAddress(e.target.value)}
                   type="text" 
                   className="w-100 photos rounded-3 ps-2 border-1"></input> 


            {Output('Photos','more photos')}
            <div className="d-flex ">
            <input  placeholder="Add using a link....jpg"
                    value={photolink}
                    onChange={(e)=>setPhotoLink(e.target.value)}
                    type="text"
                    className="w-100 rounded-3 ps-2 photos border-1"></input>
            <button type="button"
                    onClick={photobyLink} 
                    className="mx-2 d-flex justify-content-center align-items-center rounded-3 border-1 custom-hover" 
                    style={{width:'140px'}}>
             Add Photos
            </button>
            </div>
            
            <div className="row ">
            {photo.length >0 && photo.map((link,index) =>(
              <div key={index} className="col-4 position-relative" style={{width:'242px'}}>
              <img  src={`https://airbnb-3o0c.onrender.com/uploads/${link}`} className="uploaded-photo"></img>
              
              <button className="star-btn" onClick={(e)=>MainPhoto(e,link)}>
                {link !== photo[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="star">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  )}
                {link === photo[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="star">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                  
                  )}
              </button>

              <button className="delete-btn" onClick={(e)=>removePhoto(e,link)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="delete">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              
              </button>

            </div>
             ))}
              <label className="upload-btn">
              <input type="file" multiple style={{display:'none'}} onChange={uploadPhoto}></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="Upload">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
              Upload Photos</label>
            </div>

            {Output('Description','description of the place')}
            <RichTextEditor content={description}
                            setContent={setDescription}
                     /> 

            <Perks selected={perk} onChange={setPerk}/>
            

            {Output('Extra Info','house rules etc.')}
            <RichTextEditor content={extraInfo}
                            setContent={setExtraInfo}
                    />

            {Output('Check in & out time','add check in & out time')}
            <div className="d-flex row">
            <div className="me-2 col-3 col-md-2" style={{width:'auto'}}>
              <h6 className="mb-1">Check in time</h6>
              <input placeholder="14:00" 
                     value={checkin}
                     onChange={(e)=>setCheckIn(e.target.value)}
                     type="text"               
                     className="rounded-3 border-1 ps-2">
              </input>
            </div> 

            <div className="me-2 col-3 col-md-2" style={{width:'auto'}}>
            <h6 className="mb-1">Check out time</h6>
            <input  placeholder="18:00" 
                    value={checkout}
                    onChange={(e)=>setCheckOut(e.target.value)} 
                    type="text" 
                    className="rounded-3 border-1 ps-2">
            </input> 
            </div>

            <div className="me-2 col-3 col-md-2" style={{width:'auto'}}>
            <h6 className="mb-1">Max guest</h6>
            <input className="rounded-3 border-1 ps-2" 
                   value={maxGuest}
                   onChange={(e)=>setMaxGuest(Number(e.target.value))}
                   type="number" min="0" max="50" step="1" 
                   style={{width:'193px'}}>
            </input> 
            </div> 

            <div className="me-2 col-3 col-md-2" style={{width:'auto'}}>
            <h6 className="mb-1">Price per night</h6>
            <input className="rounded-3 border-1 ps-2" 
                   value={price}
                   onChange={(e)=>setPrice(Number(e.target.value))}
                   type="number" min="100" step="5" 
                   style={{width:'193px'}}>
            </input> 
            </div> 


            </div>
           

           <button className="bg-danger rounded-4 mt-3 py-2 text-white" 
                   style={{width:'120px',border:'transparent'}}>Save</button> 
          </form>  
        </div> 

    </>
   )
}
export default PlaceForm;