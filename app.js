const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
  app.use (express.json())
  app.use(cors())
  dotenv.config()
  mongoose.connect('mongodb+srv://routuprabhakar2000:Iq1Bc1tq5CsVS9Z5@cluster0.qlt9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('MangoDb connected')
})
.catch((Error)=>{
    console.log('Error',Error)
})

const userSchema = new mongoose.Schema(({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}))

const User = mongoose.model('User',userSchema)

app.post('/SignUp',async(req,res)=>{
  try {
    const formdata = new User(req.body)
    await formdata.save()

    

    
    res.json({
        message:"user saves successfully",
        data:formdata,
        
        
        
    }
        
    )
  } catch (error) {
   res.json({
    message:'error',
    data:error
   })
  }
})
app.get('/all', async(req, res)=>{
    try {
        const allData = await User.find();
        res.status(200).json({
            data:allData
        })
    } catch (error) {
        res.status(500).json({
            error:'Internal server error'
        })
    }
})

app.listen(5000,()=>{
    console.log('Server is connected in 5000 Port')
})

