const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "IloveAnushka";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came " + res.method);
    next();
}

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/signup", logger, function(req, res) {
    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })

    // we should check if a user with this username already exists
    
    res.json({
        message: "You are signed in via route /signup"
    })
})

app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
        return 
        /* res.status(403).send({
            message: "Invalid username or password"
        }) */

    } else {
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        res.header("jwt", token);

        res.header("random", "Rohit51");

        res.json({
            token: token
        })

       /* user.token = token;
        res.send({
            token
        }) */
        console.log(users);
    }
})

function auth(req, res, next) {
    const token = req.headers.authorization;
    console.log("Token is: " + token);
    const decodedData = jwt.verify(token, JWT_SECRET);
    console.log("After verify");
    if (decodedData.username) {
        req.username = decodedData.username;
        next()
    } else {
        res.json({
            message: "You are not logged in, Auth failed "
        })
        /* res.status(401).send({
            message: "Unauthorized"
        }) */
    }
}


app.get("/me", logger, auth, function(req, res) {
    
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === req.username) {
            foundUser = users[i]
        }
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000);