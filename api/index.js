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
    origin:'https://airbnb-1-4neq.onrender.com',
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
        return res.cookie('token',token, {
                           httpOnly: true,
                           secure: true, 
                            sameSite: 'None',}
                        )
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
app.get('/profile',async(req,res)=>{
    try{
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
}catch(err){
    console.log("Error occured :",err);
    res.status(500).json("Internal Error")
}
})

//Logout
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

//Upload by Link
app.post('/upload-by-link',async(req,res)=>{
    try{
    const {link} = req.body;
    const newName='photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname + '/uploads/' +newName
    })
    res.json(newName)
   }catch(err){
    console.log("Error:",err);
    res.status(500).json({message:"Server Error"}) 
   }
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
//save places
/*app.post('/saves',async(req,res)=>{
   try{
    const {token} =req.body;
    const {placeId} =  req.body;

    jwt.verify(token ,jwtSecret,{},async(err,data)=>{
        if(err) res.status(404).json({message:"Unauthenticated User"});

        const user =await User.findById(data.id);
        if(!user){
            res.status(404).json("User not found;");
        }
        if(!user.savedPlace.includes(placeId)){
            user.savedPlace.push(data);
            await user.save();
        }
        res.json({ message: 'saved' });
    })}catch(err){
    console.log("error:",err);    
    res.status(500).json("Error:",err);
   }
})
//get saves 
app.get('/saved-places',async(req,res)=>{
     try{
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      const user = await User.findById(userData.id).populate('savedPlaces');
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user.savedPlaces); // returns saved places
    });
    }catch(err){
        console.log("Error:",err);
        res.status(500).json({message:"Server Error"})
    }})*/

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
        res.status(500).json("Error occuered :" , err);
    }
})

//list of places
app.get('/user-places',async (req,res)=>{
    try{
    const {token} =req.cookies;
    jwt.verify(token,jwtSecret,{}, async (err,userdata)=>{
        const {id} = userdata;
        res.json( await Place.find({owner:id}) );
    })
    }catch(err){
        console.log("Error:",err);
        res.status(500).json({message:"Server Error"})
    }
})

//Place by id
app.get('/places/:id',async (req,res)=>{
    const {id} =req.params;
    res.json( await Place.findById(id) );
 })

//Updating Places
app.put('/places',async (req,res)=>{
    try{
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
})}catch(err){
    console.log("Error:",err);
    res.status(500).json({message:"Serever Error"})
    
}
})

//Home route
 app.get('/places',async(req,res)=>{
  res.json( await Place.find().populate('owner','name'));
}) 

//Bookings
app.post('/bookings',async(req,res)=>{
    try {
    const UserData = await getDataFromReq(req);
    const {place,numberOfGuest,checkIn,checkOut,name,email,phone,price}=req.body;
    await Booking.create({place,numberOfGuest,checkIn,checkOut,name,email,phone,price,user:UserData.id})
        .then((response)=>{
           res.json(response);
        }).catch((err)=>{
            throw err;
        })
    }catch(err){
        console.log("error:",err);
        res.status(500).json({message:"Server Error"})
        
    }
})

//BookingPage
app.get('/bookings',async (req,res)=>{
    try {
    const Data = await getDataFromReq(req);
    res.json(await Booking.find({user:Data.id}).populate('place'));
    }catch(err){
        console.log("error",err);
        res.status(500).json({message:"Server error"});
    }
})

//Port Connection-----
app.listen(port,()=>{
    console.log("Server started on Port : 4000");
});