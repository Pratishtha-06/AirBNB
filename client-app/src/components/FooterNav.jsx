import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext} from './UserContext';
import ScreenSize from './ScreenSize';


function FootNav() {
  const{user}=useContext(UserContext);
  const {pathname}=useLocation();
  const width = ScreenSize();
  
  
  return (
    <>
    <header className='px-3 py-3 d-flex justify-content-evenly h-25 bg-light' 
            style={{position:'sticky',bottom:'0px',zIndex:'1'}}>
     
      
      <Link to={'/'}className='d-flex justify-content-center align-items-center' style={{ textDecoration: 'none',marginTop:'8px'}}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logo">
       <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
       </svg>
       <span style={{fontWeight:'bold', color:'black',textAlign:'center',fontSize:'large' }}
             onClick={pathname=='/'?window.scrollTo({ top: 0, behavior: 'smooth' }):{}}>
              AirBNB
       </span>
      </Link>
  
          <Link to={user?'/account':'/login'} className='d-flex flex-column justify-content-center align-items-center text-decoration-none Profile'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="User" style={{width:'50px',height:'40px' ,color:'#5f5959'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          </Link> 
          
    </header>
       </>
      
    )
}

export default FootNav;
