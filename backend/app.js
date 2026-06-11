// Configure express and middleware


//import express app 
//create express app
//              client->app->route->response
//configure middleware - Fn that runs between request and response 
//export the app 

const express = require('express')
const app=express()

const auth=require("./routes/auth")
const restaurant=require("./routes/restaurant")

const cors=require('cors')

app.use(cors())
app.use(express.json())

app.use("/api/v1/users",auth)
app.use("/api/v1/eats/stores",restaurant)

module.exports=app
