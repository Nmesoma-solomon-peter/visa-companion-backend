const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");  //for authentication
const { createSecretToken } = require("../util/secretToken")

// the signup controller
module.exports.Signup = async (req, res) => {
    try {
        const { fullName, email, Password, cPassword, number, visaType, destination, applicationStatus, nationality, currentCountry, languages, immigrationExperience } = req.body;
        let profilePix;
        if (!req.file) {
            profilePix = "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg"
        } else {
            profilePix = req.file.path;
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.json({ "message": "Email Exist" })
        } else {
            if (Password == cPassword) {
                const enteredPassword = Password
                const HashedPassword = await bcrypt.hash(enteredPassword, 12)
                const newUser = new User({
                    Password: HashedPassword,
                    applicationStatus,
                    currentCountry,
                    destination,
                    email,
                    fullName,
                    immigrationExperience,
                    languages,
                    nationality,
                    number,
                    profilePix,
                    visaType
                })
                await newUser.save()
                    .then(() => {
                        res.status(201).json({ "message": "successful" })
                    })
            } else {
                res.json({ "message": "password don't match" })
            }

        }
    } catch (error) {
        console.log(error);
    }
}

// login Controller
module.exports.Login = async (req, res) => {
    try {
        const { email, Password } = req.body;
        const findUser = await User.findOne({ email }); //find the user from the db           
        if (findUser) {
            const validPassword = await bcrypt.compare(Password, findUser.Password);
            if (validPassword) {
                const generatedToken = createSecretToken(findUser._id);
                res.cookie("token", generatedToken, {
                    withCredentials: true,
                    httpOnly: false, // Prevents access to the cookie from JavaScript on the frontend
                    //secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
                    secure: True, // Ensures the cookie is only sent over HTTPS in production
                    sameSite: none, // Ensures the cookie is sent only to the same site
                    // sameSite: "strict",

                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

                });
                res.status(201).json({ "message": "success" })
            } else {
                res.json({ "message": "unsuccessful" });
            }
        } else {
            res.json({ "message": "unsuccessful" });
        }
    } catch (error) {
        console.log(error);
    }
}
// logoutController
module.exports.Logout = async (req, res) => {
    res.clearCookie('token'); // Clear authentication cookie
    res.status(200).json({ message: 'Logged out successfully' });
}
