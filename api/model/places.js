const mongoose=require('mongoose');

const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:String,
    address:String,
    photo:[String],
    description:String,
    perk:[String],
    extraInfo:String,
    checkIn:String,
    checkOut:String,
    maxGuest:String,
    price:Number
});

const PlaceModel = mongoose.model('Places',placeSchema);
module.exports=PlaceModel;