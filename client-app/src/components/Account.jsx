import  { useEffect, useContext ,useState} from "react";
import { UserContext } from "./UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./places";
import ProfileNav from "./ProfileNav";

function AccountPage(){
    const {ready,user,setUser}=useContext(UserContext);
    const {id}=useParams();
    const{subpage}=useParams();
    const [redirect,setRedirect]=useState(null);
    const [saves,setSaves]=useState([]);
    const [error,setError]=useState("");

    useEffect(()=>{
      axios.get('/saved-places')
      .then((response)=>{
        setSaves(response.data);
      })
      .catch(err => {
         console.error('Error fetching saved places:', err)
         setError(err)
    })
    },[id])
     
    async function logout(){
      await axios.post('/logout');
      setUser("");
      setRedirect('/');
    }
    
    if(!ready){
        return<div className="d-flex justify-content-center align-items-center Loading"><div className="mx-1 LoadingSpin"></div>Loading....</div>
    }
    
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

   if(redirect){
    return <Navigate to={'/'}/>
   }
    
   return(
    <>
    <ProfileNav/>

     { subpage === undefined && (
        <div style={{border:'1px solid grey',borderRadius:'7px'}}>
     <div className="d-flex flex-column  logbox">
        <div className="px-3 pb-2 pt-4" style={{fontWeight:"bold", fontStyle:'italic', fontSize:'larger'}}>Login Info</div>
        <div className=" pt-2 ps-3 mt-2" style={{fontSize:'large'}}>User name :</div>
        <div className="ud-1 pt-2 ps-2"> {user.name}</div>
        <div className=" pt-2 ps-3 mt-3 " style={{fontSize:'large'}}>Logged in as :</div>
        <div className="ud-2 pt-2 ps-2">{user.email}</div>
        <button className="btn btn-danger my-3 mx-3" style={{width:'80px'}} onClick={logout}>Logout</button>
     </div> 
     <div className="d-flex flex-column  logbox">
        <div className="px-3 pb-2 pt-4" style={{fontWeight:"bold", fontStyle:'italic', fontSize:'larger'}}>My Saves</div>
        {error && (<h5 style={{color:'red'}}>{error}</h5>)}
        <div>
         <div className=" d-flex row" >
            {saves.length > 0 && saves.map((place,index)=>(
                <div key={index} className="Place row-cols-3 ">
                <Link to={`/places/${place._id}`} style={{textDecoration:'none'}}>
                <div>
                    {place.photo?.[0] && 
                       <img src={`https://airbnb-3o0c.onrender.com/uploads/${place.photo?.[0]}`} className="rounded-3 w-100"
                            style={{height:'190px'}}
                            ></img>
                     }
                </div>
                <div className="text-black" >
                 <h2 className="text-truncate ms-1" style={{fontSize:'medium' ,fontWeight:'bold',width:'280px',margin:'5px 0px 0px 0px'}}>{place.title}</h2>    
                 <h6 className="text-truncate ms-1" style={{fontSize:'small',margin:'0px',width:'280px'}}>{place.address}</h6>
                 
                 </div>
                 </Link> 
                </div> 
                 
            ))}
        </div>
        </div>
       
     </div> 
     </div>
     )}
     { subpage === 'places' && (
        <Places/>
     )}
    </>
   )
}
export default AccountPage;