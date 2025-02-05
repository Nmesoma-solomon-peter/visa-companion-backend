const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Post = require("../Models/postModel");

// findallUsers Controller
module.exports.FindAllUsers = async (req, res) => {

    // Query to find all users excluding the logged-in user
    const decoded_id = jwt.decode(req.cookies.token).id;

    const users = await User.find({ _id: { $ne: decoded_id } });
    res.json({ "user": users })
}

// findLogginUser
module.exports.FindLoggedInUser = async (req, res) => {
    // Query to find all users excluding the logged-in user   
    const decoded_id = jwt.decode(req.cookies.token).id;
    const user = await User.find({ _id: decoded_id });
    res.json({ "user": user })
}

// route to create a new post
module.exports.CreateNewPost = async (req, res) => {
    try {
        const decoded_id = jwt.decode(req.cookies.token).id;
        const images = req.files.images;
        // Ensure `images` is an array before mapping over it
        const postImages = [];
        if (Array.isArray(images)) {
            images.forEach((image) => {
                postImages.push(image.path);
                console.log(image.path);

            });
        } else if (images) {
            // If `images` is a single object, add it directly
            postImages.push(images.path);
            console.log(images.path);

        }

        // Retrieve the logged-in user
        const loggedUser = await User.findOne({ _id: decoded_id });
        if (!loggedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Destructure data from request body
        const { postText } = req.body;

        // Create a new post
        const newPost = new Post({
            userId: loggedUser._id,
            content: postText,
            images: postImages,
            comments: [],
            shares: [],
        });

        // Save the post to the database
        await newPost.save();

        // Respond to the client
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//module to get all posts
module.exports.ReadAllPosts = async (req, res) => {
    try {
        console.log("called");
        // Retrieve all posts
        const posts = await Post.find({})
            .populate("userId", "fullName profilePix") // Populate user details (name, email)
            .sort({ createdAt: -1 }); // Sort by most recent posts            
        // Send the posts as a response
        console.log(posts);
        res.status(200).json({ message: "All posts retrieved successfully", posts });
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}