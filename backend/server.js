const express= require("express")
const {chats}=require("./data/data.js")
const dotenv =require("dotenv")
const app=express()
dotenv.config()


app.get('/',(req,res)=>{

 res.send("The API is running");


})

app.get('/chats',(req,res)=>{

  res.send(chats)

})

const PORT=process.env.PORT||5000

app.listen(5000,console.log('server started on port ${PORT}'));
