// MongoDB


const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

// Convert data into json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Use ejs as view engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('signup');
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/home", (req, res) => {
    res.render('home');
});

// Register User
app.post("/signup", async (req, res) => {
    
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    // Check if user already exists
    const existingUser = await collection.findOne({ username: data.username });

    if (existingUser) {
        return res.send("User already exists");
    } else {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword; // Replace hashed password with actual password

        const userdata = await collection.insertMany(data);
        res.redirect('/home');
        // console.log(userdata);
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ username: req.body.username });
        if (!check) {
            return res.send("Username not found!");
        }
        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.redirect('/home');
        } else {
            res.send("Invalid Password!");
        }
    } catch (error) {
        res.send("Wrong Details!");
    }
});

// Route to render home page
app.get('/home', (req, res) => {
    const userId = req.session.userId; // Get user ID from session
    if (!userId) {
        return res.redirect('/login');
    }

    const user = getUserById(userId); // Fetch user details from the database
    res.render('home', { user });
});


const PORT = 5000;

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});