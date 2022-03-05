var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const User = require('../models/User');

const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        const user = await User.findById({_id : data.user.id}).select("-password -timetable -_id")
        req.user = data.user;
        req.user.details = user
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;