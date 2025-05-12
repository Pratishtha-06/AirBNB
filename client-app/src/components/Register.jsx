import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function SignIn(){
     const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const [name,setName]=useState(""); 
     const [error,setError]=useState("");

     const registerUser= async (e)=>{
       e.preventDefault();
       try{
        if(!name||!email||!password){
          setError("Please fill the details");
          return;
        }        
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
         setError("Please enter a valid email address.");
         return;
        }

       const response = await axios.post('http://localhost:4000/register',{
              name,
              email,
              password,
       })
       const backendmsg=response.data.message; 
          setError(backendmsg);
       }catch(error){
          setError("Registration failed.Please try again later");
       }
     }

     const removeError=(e)=>{
       const {name,value}=e.target;
       if(name=="email")setEmail(e.target.value)
       else if(name=="password")setPassword(e.target.value);       
       setError("");
     }
    return (
        <>
         <div className="d-flex flex-column text-center align-items-center mt-5  mx-auto p-3" >
          <h1>Register</h1>
           <form className="d-flex flex-column" onSubmit={registerUser} style={{width:'350px'}}>
             <input className="my-2 ps-2 input-1" 
                    type="text" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)} ></input>
             <input className="my-2 ps-2 input-1" 
                    type="email" 
                    name="email"
                    placeholder="youremail@gmail.com" 
                    value={email}
                    onChange={removeError} ></input>
             <input className="my-2 ps-2 input-2" 
                    type="password"
                    name="password"
                    placeholder="password" 
                    value={password}
                    onChange={removeError}></input>
              <div style={{height:'18px'}}>      
                {error &&(
                <div style={{fontSize:'13px', color:'red', marginLeft:'8px',textAlign:'left'}}>{error}</div>
                )}      
              </div>
             <button className="btn btn-danger my-4 button" >Register</button>
            <div>Already a member? <Link to={'/login'} style={{color:"black", fontWeight:'500',fontStyle:'italic'}}>Login</Link></div>  
          </form>      
        </div>
        </>
    )
}
export default SignIn;