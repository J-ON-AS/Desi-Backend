require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const insaanRouter = require('./routes/insaan')
const photballRouter = require('./routes/photball')
const checkKarraHu = require('./middlewares/checkKaroBanda')

const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());
app.use('/auth',insaanRouter);
app.use('/players',checkKarraHu,photballRouter)
const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT,()=>{
      console.log(`Server is listening on port ${PORT}`);
    })
    
  } catch (error) {
    console.log(error)
  }
}
start();