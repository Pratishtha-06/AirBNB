import React, { useContext, useEffect ,useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";


function Home(){
   const [places,setPlaces] = useState([]);
   
   
    useEffect(()=>{
        axios.get('/places').then((response)=>{
            setPlaces([...response.data]);
        })
    },[])
    
   
    return(
        <>
        <div className=" d-flex row" >
            {places.length > 0 && places.map((place,index)=>(
                <div key={index} className="Place row-cols-3 ">
                <Link to={`/places/${place._id}`} style={{textDecoration:'none'}}>
                <div>
                    {place.photo?.[0] && 
                       <img src={`http://localhost:4000/uploads/${place.photo?.[0]}`} className="rounded-3 w-100"
                            style={{height:'190px'}}
                            ></img>
                     }
                </div>
                <div className="text-black" >
                 <h2 className="text-truncate ms-1" style={{fontSize:'medium' ,fontWeight:'bold',width:'280px',margin:'5px 0px 0px 0px'}}>{place.title}</h2>    
                 <h6 className="text-truncate ms-1" style={{fontSize:'small',margin:'0px',width:'280px'}}>{place.address}</h6>
                 <h6  style={{color:'gray' ,margin:'0px 0px 0px 4px'}}>Stay with {place.owner.name}</h6> 
                 <h6 className="text-truncate ms-1" style={{fontSize:'medium' ,width:'280px',height:'20px'}}>${place.price} per night</h6>    
                 
                 </div>
                 </Link> 
                </div> 
                 
            ))}
        </div>
        </>
    )
}
export default Home;