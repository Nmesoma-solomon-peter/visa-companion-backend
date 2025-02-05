const {FindAllUsers,FindLoggedInUser,CreateNewPost,ReadAllPosts} = require('../Controllers/VerifiedUserController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();
const postMediaUpload = require('../Models/multerPostConfig');


// router.post('/',userVerification)
router.get('/users/findall',userVerification,FindAllUsers)
router.get("/users/findloggedinuser/",userVerification,FindLoggedInUser)
router.post("/user/post",userVerification,postMediaUpload.fields([{ name: 'images' }, { name: 'document' }]),CreateNewPost);
router.get("/users/readallposts",userVerification,ReadAllPosts);

module.exports = router
