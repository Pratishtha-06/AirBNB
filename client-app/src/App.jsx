import { BrowserRouter, Route,Routes } from "react-router";
import Login from "./components/Login";
import Layout from "./components/layout";
import Home from "./components/Home";
import SignIn from "./components/Register";
import AccountPage from "./components/Account";
import axios from "axios";
import UserContextProvider from "./components/UserContext";
import Places from "./components/places";
import PlaceForm from "./components/Placeform";
import SinglePage from "./components/SinglePage";
import BookingPage from "./components/BookingPage";
import SingleBooking from "./components/SingleBooking";

axios.defaults.baseURL='https://airbnb-66sr.onrender.com';
axios.defaults.withCredentials=true;


function App(){
    return(
        <>
        <UserContextProvider>
         <Routes>
           <Route path='/' element={<Layout/>}>
             <Route index element={<Home/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<SignIn/>}/>
             <Route path="/account/" element={<AccountPage/>}/> 
             <Route path="/account/places" element={<Places/>}/>
             <Route path="/account/places/new" element={<PlaceForm/>}/>
             <Route path="/account/places/:id" element={<PlaceForm/>}/>
             <Route path="/places/:id" element={<SinglePage/>}/>
             <Route path="/account/bookings" element={<BookingPage/>}/>
             <Route path="/account/bookings/:id" element={<SingleBooking/>}/>


          </Route>
         </Routes>
        </UserContextProvider>
        
         </>
    )
}
export default App;