const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys')

const app = express();

// connect to mLab mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("Connected to mLab " + keys.mongodb.dbURI)
});

// set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(4001, () => {
    console.log("Listening on PORT 4001");
})