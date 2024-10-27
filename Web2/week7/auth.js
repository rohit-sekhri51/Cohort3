const jwt = require("jsonwebtoken");
const JWT_SECRET = "RHT51";

function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET);

    if (response) {
        req.userId = response.userId;
       // console.log("inside auth req.userId "+ req.userId);
        next();
        
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}