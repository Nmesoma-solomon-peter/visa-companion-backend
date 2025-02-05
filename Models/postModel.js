const mongoose = require('mongoose');
// const User = require("./UserModel");

// post schema
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    // media: { type: String, default: null }, // e.g., image, video
    images: { type: [String], default: [] }, // Array of image URLs
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

// models
module.exports = mongoose.model('Post', postSchema);
