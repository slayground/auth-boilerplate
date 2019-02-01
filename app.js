const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mLab mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("Connected to mLab " + keys.mongodb.dbURI)
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(4001, () => {
    console.log("Listening on PORT 4001");
})