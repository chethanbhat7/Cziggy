
const app=require("./app")
const connectDatabase=require('./config/database')

const dotenv=require("dotenv")
//load env variable
dotenv.config({path:"./config/config.env"})

//Connect to db
connectDatabase()

//start the server
app.listen(process.env.PORT,()=>{
    console.log(`Server Started on PORT:${process.env.PORT}`)
})

