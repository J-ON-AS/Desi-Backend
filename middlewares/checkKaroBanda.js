const jwt = require('jsonwebtoken');
const checkKarraHu = async(req,res,next)=>{
 const authHeader = req.headers.authorization;
  console.log(authHeader)
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    req.banda = {insaanId:payload.insaanId,name:payload.name}
    next()
  } catch (error) {
    console.log(error)
  }
}
module.exports = checkKarraHu;