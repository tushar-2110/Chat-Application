//importing express
const express = require("express");
//importing chats
const { chats } = require("./data/data");
//importing an env file
const dotenv = require("dotenv");
//connecting database
const connectDB = require("./config/db");


const colors=require("colors")

//creating an instance for express
const app = express();
dotenv.config();

connectDB()


//creating an api
app.get("/", (req, res) => {
  res.send("Api is running Succesfullly");
});

//creating an complex API
app.get("/api/chat", (req, res) => {
  res.send(chats);
});
//creating an another end point with the id's of data

app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log("server has beeen started on port ${PORT}".yellow.bold));