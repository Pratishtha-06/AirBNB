const mongoose= require('mongoose');
const { default: Places } = require('../model/places');

const BookingSchema =new mongoose.Schema({
   place :{type:mongoose.Schema.Types.ObjectId ,required:true,ref:'Places'},
   user :{type:mongoose.Schema.Types.ObjectId ,required:true},
   checkIn:{type:Date ,required:true},
   checkOut:{type:Date ,required:true},
   numberOfGuest:{type:Number},
   name:{type:String ,required:true},
   email:{type:String ,required:true ,unique:true},
   phone:{type:Number ,required:true},
   price:{type:Number}

}) 

const BookingModel =mongoose.model('Booking' ,BookingSchema);
module.exports = BookingModel;