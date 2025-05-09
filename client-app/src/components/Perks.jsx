import React from "react";

function Perks({selected,onChange}){
   const handleClick=(e)=>{
    const {checked,name}=e.target;
     if(checked){
      onChange([...selected,name]);
      }else{
        onChange(selected.filter(selectedName=>selectedName !== name ))
      }

   } 

    return(
        <>
           <h4 className="mb-0 mt-3">Perks</h4>  
            <div className="ps-1" style={{fontSize:'small'}}>select perks of your place</div>          
            <div className="row">  
            
            <div className="mb-2 mx-2 rounded-2 col-6 col-md-4 d-flex flex-column justify-content-center perk">
              <label className="d-flex">
                <input type="checkbox" 
                       onChange={handleClick}
                       checked={selected.includes('wifi')}  
                       name="wifi"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 pic">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wifi</span>
              </label>
            </div>

            <div className="mb-2 mx-2 rounded-2 col-6 col-md-4 d-flex flex-column justify-content-center perk">
              <label className="d-flex">
                <input type="checkbox" 
                       onChange={handleClick}
                       checked={selected.includes('private entry')} 
                       name="private entry"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 pic">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Private entry</span>
              </label>
            </div>

            <div className="mb-2 mx-2 rounded-2 col-6 col-md-4 d-flex flex-column justify-content-center perk">
              <label className="d-flex">
                <input type="checkbox" 
                       onChange={handleClick}
                       checked={selected.includes('pets')} 
                       name="pets"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 pic">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Pets</span>
              </label>
            </div>

            <div className="mb-2 mx-2 rounded-2 col-6 col-md-4 d-flex flex-column justify-content-center perk">
              <label className="d-flex">
                <input type="checkbox" 
                       onChange={handleClick}
                       checked={selected.includes('free parking spot')}  
                       name="free parking spot"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 pic">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Free parking spot</span>
              </label>
            </div>

            <div className="mb-2 mx-2 rounded-2 col-6 col-md-4 d-flex flex-column justify-content-center perk">
              <label className="d-flex">
                <input type="checkbox" 
                       onChange={handleClick}
                       checked={selected.includes('tv')} 
                       name="tv"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 pic">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>TV</span>
              </label>
            </div>
            </div>
        </>
    )
}

export default Perks;