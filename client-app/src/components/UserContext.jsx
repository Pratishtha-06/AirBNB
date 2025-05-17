import React, { createContext, useState ,useEffect} from "react";
import axios from "axios";

export const UserContext=createContext({})

function UserContextProvider({children}){
  const [user,setUser]=useState(null);  
  const [ready,setReady]=useState(false);
  const [click,setClick]=useState(false);
 
  
  useEffect(() =>{
    if(!user){
      axios.get('/profile')
      .then(({data})=>{
        setUser(data);
        setReady(true);
      })
      .catch((err)=>{
        console.log("Error found:",err);
        setUser(null)
       })
      
    }
  },[])
    return(
        <>
        <UserContext.Provider  value={{user,setUser,ready,click,setClick}}>
         {children}
        </UserContext.Provider>
        </>
    )
}
export default UserContextProvider;