const Express = require('express');
const app = Express();
const cors = require("cors"); //for successfull connection to frontend
// app.use(cors({
//     origin:["https://visa-companion-frontend.onrender.com/"], 
//     credentials: true, // Allows cookies to be sent
//     // methods:["GET","POST","PUT","DELETE"],
// }));

app.use(cors({
    origin: ["https://visa-companion-frontend.onrender.com"],
    credentials: true, // Allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow these headers
  }));

app.use(Express.json())

const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
require("dotenv").config();
const {MONGO_URL,PORT} = process.env;
mongoose.connect(MONGO_URL)
.then(()=>console.log("MongoDB is connected successfully"))
.catch((err)=>console.log(err));
const User = require("./Models/UserModel");
const authRoute = require("./Routes/AuthRoutes")
const verifiedRoute = require("./Routes/VerifiedRoutes")
const bodyParser = require('body-parser');
const path = require('path');

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

// Middleware
app.use(bodyParser.json());
app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));
//routes
app.use("/auth",authRoute)
// app.use("/")
app.use("/verified/",verifiedRoute,)

app.get("/tryit",(req,res)=>{
    res.json({"message":"see me ooo"});
})


app.listen(PORT, () => console.log('server is running on port 5000'));

