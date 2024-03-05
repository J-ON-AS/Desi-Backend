const mongoose = require('mongoose')

const photballSchema = new mongoose.Schema({
  playerName:{
    type:String,
    required:[true,'Please provide Player Name'],
    maxLength:50,
    minLength:5,
  },
  banayaKisne:{
    type:mongoose.Types.ObjectId,
    ref:'Insaan',
    required:[true,'Please Provide User'],
  },
},{
  timestamps:true
})
module.exports = mongoose.model('Geeme',photballSchema)