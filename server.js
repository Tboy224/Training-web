// MongoDB
require('./config/db');

const express = require('express');
const app = express();
const port = 3000;

const UserRouter = require('./api/User');

// For accepting post form data
app.use(express.json());

app.use('/user', UserRouter);

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});