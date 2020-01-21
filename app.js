const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require('passport');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then( () => console.log("Connected to mongoDB"))
    .catch( err => console.log(err))
    
// app.get("/", (req, res) => {
//     const user = new User ({
//         handle: 'mendo',
//         email: 'mendo@gmail.com',
//         password: 'password'
//     })
//     user.save();
//     res.send("Hello App!")
// });


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));

