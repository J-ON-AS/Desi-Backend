const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const insaanSchema = new mongoose.Schema({
  naam:{
    type:String,
    required:[true,'Please provide Name'],
    maxLength:50,
    minLength:3,
  },
  email:{
    type:String,
    required:[true,'Please provide Email'],
    match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email'
    ],
    unique:true,
  },
  password:{
    type:String,
    required:[true,'Please provide Password'],
    minLength:6,
  },
  
})
insaanSchema.pre('save',async function(){
  const namak = await bcrypt.genSalt(10);
  this.password =await  bcrypt.hash(this.password,namak)
})

insaanSchema.methods.banaoJWT = function(){
  return jwt.sign({insaanId:this._id,name:this.naam},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_LIFE,
  })
}
insaanSchema.methods.passwordSahiYaNahin = async function(InsaanPassword){
 const isMatch = await bcrypt.compare(InsaanPassword,this.password);
 return isMatch;
}
module.exports = mongoose.model('Insaan',insaanSchema);