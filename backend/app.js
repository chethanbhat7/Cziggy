// Configure express and middleware


//import express app 
//create express app
//              client->app->route->response
//configure middleware - Fn that runs between request and response 
//export the app 

const express = require('express')
const app=express()

const cors=require('cors')

app.use(cors())
app.use(express.json())

module.exports=app
