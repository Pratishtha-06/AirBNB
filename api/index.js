const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User = require('./model/user.js');
const Place =require('./model/places.js');
const Booking =require ('./model/booking.js');
const multer=require('multer');
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser');
const imageDownloader= require('image-downloader');
const fs = require('fs');


require('dotenv').config({path:'./.env'});

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

const jwtSecret =process.env.JWT_SECRET;
const port = process.env.Port || 4000;


const getDataFromReq=(req)=>{
  return new Promise((resolve,reject)=>{
    jwt.verify(req.cookies.token,jwtSecret,{},(err,Userdata)=>{
        if(err) reject(err);
        resolve(Userdata);
    })
  }) 
}

//Database Connection----
mongoose.connect(process.env.MONGO_URI)
.then((result)=>{
    console.log("Database connected");
}).catch((err)=>{
 console.log("error :",err);
})

//Register----
app.post('/register',async(req,res)=>{
    try{
    const {name,email,password}=req.body;

    const existingUser=await User.findOne({email:email});
    if(existingUser){
     return  res.json({message:"User already exsist"});
    }
    const UserDoc=await User.create({
        name:name,
        email:email,
        password:password
    })
    res.status(201).json({UserDoc});
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
    }
})

//Login-----
app.post('/login',async (req,res)=>{
    try{
    const {email,password}=req.body;

    const existingUser=await User.findOne({email});
    if(existingUser){
      const isPassword = await existingUser.comparePassword(password);
      if(isPassword){
       jwt.sign({
        email:existingUser.email,
        id:existingUser._id
       },jwtSecret,(err,token)=>{
        if(err) {
            throw err; 
        };
        return res.cookie('token',token)
                  .status(200)
                  .json(existingUser);
         }) 
      }else{
        return res.status(401).json({message:"Incorrect password"});
      }
    }else{
        return res.status(404).json({message:"Email not found"});
      }
    }catch(err){
        console.error("Login error:", err);
       return res.status(500).json({message:"Internal server error"});
    }
})

//Profile
app.get('/profile',(req,res)=>{
   const{token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async(err,userdata)=>{
            if(err)throw err;
            const {name,email,_id}=await User.findById(userdata.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
})

//Logout
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

//Upload by Link
app.post('/upload-by-link',async(req,res)=>{
    const {link} = req.body;
    const newName='photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname + '/uploads/' +newName
    })
    res.json(newName)
})

//Uploading Files
const photoMiddleware = multer({dest:'uploads'});
app.post('/uploads',photoMiddleware.array('photos',100),async(req,res)=>{
    try{
    const uploadFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts= originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.' +ext;
        fs.renameSync(path,newPath);
        uploadFiles.push(newPath.split('uploads/')[1]);
       } 
    res.json(uploadFiles)
}catch(err){
    res.status(500).json("error occured :" + err);
}

})
//Places
app.post('/places',async(req,res)=>{
    try{
    const {token}=req.cookies;
    const {title , address, photo, description,
        perk,extraInfo,  checkin,checkout,maxGuest,price}=req.body;
    jwt.verify(token,jwtSecret,{},async(err ,userdata)=>{
        if (err) throw err;
    const placeDoc = await Place.create({
            owner:userdata.id,
            title,
            address,
            photos: photo,
            description,
            perk,
            extraInfo,
            checkIn: checkin,
            checkOut: checkout,
            maxGuest: maxGuest,
            price
          })
      res.json(placeDoc);
    })
    }catch(err){
        console.log(err);
        res.status(500).json("Error occuered :" + err);
    }
})

//list of places
app.get('/user-places',async (req,res)=>{
    const {token} =req.cookies;
    jwt.verify(token,jwtSecret,{}, async (err,userdata)=>{
        const {id} = userdata;
        res.json( await Place.find({owner:id}) );
    })
})

//Place by id
app.get('/places/:id',async (req,res)=>{
    const {id} =req.params;
    res.json( await Place.findById(id) );
 })

//Updating Places
app.put('/places',async (req,res)=>{
    const {token}=req.cookies;
    const {id,title , address, photo, description,
        perk,extraInfo,  checkin,checkout,maxGuest,price}=req.body;
    jwt.verify(token,jwtSecret,{}, async (err,userdata)=>{
        if(err){
            console.log("ERROR :" + err);
            return res.status(401).json("Invalid Token");
        }
    const placeDoc = await Place.findById(id);
    if(userdata.id === placeDoc.owner.toString()){
        placeDoc.set({title , address, photo, description,
           perk,extraInfo,  checkin,checkout,maxGuest,price });
        await placeDoc.save();
        res.json('ok');
    } else {
    res.status(403).json('You are not the owner of this place');
  }
})})

//Home route
 app.get('/places',async(req,res)=>{
  res.json( await Place.find().populate('owner','name'));
}) 

//Bookings
app.post('/bookings',async(req,res)=>{
    const UserData = await getDataFromReq(req);
    const {place,numberOfGuest,checkIn,checkOut,name,email,phone,price}=req.body;
    await Booking.create({place,numberOfGuest,checkIn,checkOut,name,email,phone,price,user:UserData.id})
        .then((response)=>{
           res.json(response);
        }).catch((err)=>{
            throw err;
        })
})

//BookingPage
app.get('/bookings',async (req,res)=>{
   const Data = await getDataFromReq(req);
    res.json(await Booking.find({user:Data.id}).populate('place'));
})

//Port Connection-----
app.listen(port,()=>{
    console.log("Server started on Port : 4000");
});