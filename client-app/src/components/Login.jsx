import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {UserContext} from './UserContext';
import { useContext } from "react";


function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [redirect,setRedirect]=useState(false);
  const {setUser}=useContext(UserContext);
  

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
     if(!email||!password){
      setError("Please fill the details");
      return;
     } 
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
     }

    const response=await axios.post('https://airbnb-n3t2.onrender.com/login',{email,password},{withCredentials:true})
    const backendmsg= response.data.message;
   
    if(response.status==200){
       setError("");
       setUser(response.data);
       alert("Login successfull");
       setRedirect(true);
    }else{
       setError(backendmsg);
       setLog(false);
    }  
    }catch(err){
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message);
      }else{
        setError("Login failed.Please try later.")}
    }}

    if(redirect){
      return <Navigate to={'/'}/>
    }

      const handleInput=(e)=>{
      const {name,value}=e.target;
      if(name=="email")setEmail(value)
      else if(name=="password")setPassword(value);
       setError("");
    }

    return (
        <>
        <div className="d-flex flex-column text-center align-items-center mt-5  mx-auto p-3" >
          <h1>Login</h1>
           
          <form className="d-flex flex-column" onSubmit={handleLogin} style={{width:'350px'}}>
          <input className="my-2 ps-2 input-1" 
                 type="email" 
                 name="email"
                 value={email}
                 placeholder="youremail@gmail.com"
                 onChange={handleInput} ></input>    
          <input className="my-2 ps-2 input-2"
                 type="password" 
                 name="password"
                 value={password}
                 placeholder="password"
                 onChange={handleInput}></input>
          <div style={{height:'18px'}}>
            {error && (
              <div style={{fontSize:'13px', color:'red', marginLeft:'10px',textAlign:'left'}}>{error}</div>
            )}   
          </div>    
          <button className="btn btn-danger my-4 button" >Login</button>
          <div>Don't have account ? <Link to={'/register'} style={{color:"black", fontWeight:'500',fontStyle:'italic'}}>Register</Link> now</div>  
          </form>      
        </div>

        </>
    )
}
export default Login;