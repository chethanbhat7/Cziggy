//Start Server

const app = (()=>{const r=require('./app');const a=(r&& (r.default||r.app||r));return (a&&typeof a.listen==='function')?a:require('express')()})()
const dotenv = require('dotenv')

//load dotenv
dotenv.config({'path': './config/config.env'})

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT:${process.env.PORT}`)
})