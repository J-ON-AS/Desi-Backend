const Insaan = require('../models/insaan_ka_dhancha');
const {StatusCodes} = require('http-status-codes')
const register = async (req,res) =>{
  console.log(req.body);
  const  pehchaan = await Insaan.create({...req.body});
  const token = pehchaan.banaoJWT();
  res.status(StatusCodes.CREATED).json({user:{name:pehchaan.naam},token});
}
const login = async (req,res)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Please provide email and passsword');
  }
  const dhoondaHuaInsaan = await Insaan.findOne({ email });
  if (!dhoondaHuaInsaan) {
    throw new Error('Credentials are not valid');
  }
  const passwordSahiHa = await dhoondaHuaInsaan.passwordSahiYaNahin(password);
  if (!passwordSahiHa) {
    throw new Error("Credentials are not valid");
  }
  const token = dhoondaHuaInsaan.banaoJWT();
  res.status(StatusCodes.OK).json({user:{name:dhoondaHuaInsaan.naam},token});
}
module.exports = {
  register,
  login
}