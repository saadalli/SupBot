const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path');
const mySqlPool = require('./config/db')
// const connectDb = require('./config/db')
const bodyParser = require("body-parser");

// dot env configuration
dotenv.config();


// rest object /
const app = express()
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// midleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.get('/',(req,res)=>{
    return res
    .status(200)
    .send("<h1>Chat bot backend is working correctly</h1>")
})

// app.use('/api/v1/auth',require("./routes/authRoutes"))
// app.use('/api/v1/admin',require("./routes/adminRoutes"))
app.use('/api/v1/user',require("./routes/userRoutes"))
// Serve static images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// PORT
const PORT = process.env.PORT || 8080;

// listen

// DB Connection
mySqlPool.query('SELECT 1').then(()=>{
    console.log("db connected ")
    
    app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`.white.bgMagenta)
    })
}).catch((error)=>{
    console.log(error)
})