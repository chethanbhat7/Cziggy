// Configure express and middleware


//import express app 
//create express app
//              client->app->route->response
//configure middleware - Fn that runs between request and response 
//export the app 

const express = require('express')
const app=express()

const auth=require("./routes/auth")

const cors=require('cors')

app.use(cors())
app.use(express.json())

app.use("/api/v1/users",auth)

module.exports=app
