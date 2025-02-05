const {Signup,Login,Logout} = require('../Controllers/AuthController');
// const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();
const upload = require('../Models/multerConfig'); // Import multer config

// router.post('/',userVerification)
router.post('/user/signup',  upload.single('profilePix'), Signup)
router.post('/user/signin',Login)
router.post('/user/signout',Logout)

module.exports = router