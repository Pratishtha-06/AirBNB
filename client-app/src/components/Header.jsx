import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext} from './UserContext';
import ScreenSize from './ScreenSize';


function Header() {
  const{user}=useContext(UserContext);
  const width = ScreenSize();
  
  
  return (
    <>
    <header className='px-3 py-3 d-flex justify-content-between h-50 bg-light' 
            style={{position:'sticky',top:'0px',zIndex:'1'}}>
     
      { width > 450 && (
      <Link to={'/'} style={{ textDecoration: 'none',marginTop:'8px'}}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logo">
       <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
       </svg>
       <span style={{fontWeight:'bold', color:'black',textAlign:'center',fontSize:'large' }}>AirBNB</span>
      </Link>
      )}

      <div className="d-flex justify-content-center align-items-center border border-secondary rounded-5 pt-1 ps-2 pe-2 pb-1 shadow" style={{height:'40px',width:'300px'}}>
        <div className='pe-2'>Anywhere</div>
        <div className='border border-secondary h-100'></div>
        <div className='pe-2 ps-2'>Anyweek</div>
        <div className='border border-secondary h-100'></div>
        <div className='pe-2 ps-2'>Add guest</div>
        <button className='Search'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="35" height="35">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
           
           {width > 450 && (
          <Link to={user?'/account':'/login'} className='d-flex flex-column justify-content-center align-items-center text-decoration-none Profile'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="User" style={{width:'50px',height:'40px' ,color:'#5f5959'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {!!user && (
            <>
            <div style={{color:'black', fontWeight:'bold'}}>{user.name}</div>
            </>
          )}
          </Link> 
           )}
          
    </header>
       </>
      
    )
}

export default Header;
