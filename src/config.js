const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://Admin:admin@cluster0.kxch2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Check if connected or not
connect.then(() => {
    console.log("Connected to MongoDB!!");
}).catch((err) => { 
    console.log(err);
});

// Create a Schema
const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

// Collection Part
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;