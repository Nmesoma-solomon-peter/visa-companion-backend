const mongoose = require('mongoose');

// schemas
// const userSchema = new mongoose.Schema({
//     fullName: String,
//     email: String,
//     Password: String,
//     applicationStatus: String,
//     currentCountry: String,
//     destination: String,
//     immigrationExperience: String,
//     languages: String,
//     nationality: String,
//     number: String,
//     profilePix: String,
//     visaType: String
// })

// schemas
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
    },
    Password: {
        type: String,
        required: true,
    },
    applicationStatus: {
        type: String,
        required: true,
    },
    currentCountry: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    immigrationExperience: {
        type: String,
        required: true,
    },
    languages: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: false,
    },
    profilePix: {
        type: String,
        required: false, // Optional field
    },
    visaType: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);


// model
// module.exports = mongoose.model("Users", userSchema);


