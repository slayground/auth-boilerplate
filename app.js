const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')

const app = express();

//set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(4001, () => {
    console.log("Listening on PORT 4001");
})