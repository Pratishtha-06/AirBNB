import React from "react";

function PlaceImg ({place,index=0,className=null,style}){
    if (!place?.photo || place.photo.length === 0) return null;
    if (!className) className = 'object-cover w-100 h-100';

    return (
        <>
         <img src={'http://localhost:4000/uploads/' + place.photo[index]}
                         className={className} style={style}/>
        </>
    )
}
export default PlaceImg;