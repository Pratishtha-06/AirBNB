const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:String,
  email:{type:String,unique:true},
  password:{type:String,unique:true} ,
  saves:[{type:mongoose.Schema.Types.ObjectId,ref:'Places'}]
})

UserSchema.pre('save',async function(next){
  const person=this;
  if(!person.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(person.password,salt);
        person.password=hashPassword;
        next();
    }catch(err){
      return next(err);
    }})

  UserSchema.methods.comparePassword= async function(candidatePassword){
    try{
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
    }catch(err){
      throw err;
    }
    }  

    const UserModel=mongoose.model('User',UserSchema);
    module.exports=UserModel;

