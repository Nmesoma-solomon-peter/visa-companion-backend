const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req,res,next)=>{
    const token = req.cookies.token
    console.log("coooooooo",req.cookies);
    
    if(!token){
        return res.json({status:false})
    }
    jwt.verify(token,process.env.TOKEN_KEY,async(err)=>{
        if(err){
            return res.json({status:false})
        }else{
            // const user = await User.findById(data.id)
            // if(user) return res.json({status: true,user:user.email})
            // else return res.json({status:false});
        next()
        }
    })
}