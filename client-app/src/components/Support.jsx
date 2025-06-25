import React from "react";
import ScreenSize from "./ScreenSize";
import IG from '../assets/instagram.png';
import FB from '../assets/facebook.png';
import TW from '../assets/twitter.png';

function Support(){
    const width = ScreenSize();

    const handleStyle=()=>({
            borderTop:'1px solid #cbc5c5',
            position:'relative',
            left:'12%'
        });

    const handleStyle1=()=>({
           display:'flex',
           flexDirection:'row-reverse',
           justifyContent:'space-between'
    })

    const Separator = () =>
    width < 500 ? <div style={handleStyle()} className="w-75 my-2"></div> : null;

    return(
        <>
        <div className="row">
            <div className={width < 350 ? 'col-12 mt-2 pt-2' : 'col-4' }>
            <h6 className="ms-2">Support</h6>
            <div className="m-2">Help Center</div>
            <div className="m-2">AirCover</div>
            <div className="m-2">Anti-discrimination</div>
            <div className="m-2">Disability Support</div>
            <div className="m-2">Cancellation Options</div>
            <div className="m-2">Report neighbourhood concern</div>
            </div>
 
            <Separator/>

            <div className={width < 350 ? 'col-12 mt-2 pt-2' : 'col-4'} >
            <h6 className="ms-2">Hosting</h6>
            <div className="m-2">AirBNB your Home</div>
            <div className="m-2">AirCover for Host</div>
            <div className="m-2">Hosting Resources</div>
            <div className="m-2">Community forum</div>
            <div className="m-2">Hosting responsibility</div>
            <div className="m-2">Join a free Hosting class</div>
            <div className="m-2">Find a co-host</div>
            </div>
           
            <Separator/>

            <div className={width < 350 ? 'col-12 mt-2 pt-2' : 'col-4' }>
            <h6 className="ms-2">AirBNB</h6>
            <div className="m-2">2025 Summer Release</div>
            <div className="m-2">Newsroom</div>
            <div className="m-2">New Feature</div>
            <div className="m-2">Career </div>
            <div className="m-2">Investors</div>
            <div className="m-2">AirBNB.org emergency stay</div>
            </div>

            <Separator/>

            <div style={width > 500 ? handleStyle1() :{}}>
                <div>
                <div className="d-flex align-items-center" style={{margin:'11px 0px 0px 11px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20px' ,height:'20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <h6 style={{fontSize:'small',margin:'0px 15px'}}>ENGLISH (IN)</h6>
                </div>
                
                <div>
                 <img src={FB} style={{width:'15px',height:'15px',margin:'25px 0px 0px 15px'}}/>
                 <img src={IG} style={{width:'15px',height:'15px',margin:'25px 0px 0px 15px'}}/>
                 <img src={TW} style={{width:'15px',height:'15px',margin:'25px 0px 0px 15px'}}/>
                </div>
                </div>

                <div style={{margin:'25px 0px 0px 15px'}}>
                    2025AirBNB
                </div>

 
            </div>
        </div>
        
        </>
    )
}
export default Support;