const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        // not logged in -> no data to show
        res.send("You haven't log in.")
    } else {
        // logged in -> nothing happens
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.send(req.user)
})

module.exports = router;