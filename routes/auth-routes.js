const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.send("Login Page")
})

router.get('/logout', (req, res) => {
    // handle with passport
    res.send("logging out")
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

//callback route to google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // most basic: res.send(req.user);
    res.redirect('/profile')
})

module.exports = router;