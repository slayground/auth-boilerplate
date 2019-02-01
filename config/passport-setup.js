const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    // done(error, data)
    done(null, user.id);
})

passport.use(
    new GoogleStrategy({
        // options for a strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback func
        // check if user has already existed
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have an user
                console.log("User already exist:");
                console.log(currentUser);
                done(null, currentUser);
            } else {
                // no user yet => create new record
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                }).save().then((newUser) => {
                    console.log("New user is:");
                    console.log(newUser);
                })
            }
        })
    })
)