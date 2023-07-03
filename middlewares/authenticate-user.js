const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({status: 'missing token', msg: "no token provided"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const userToken = await jwt.verify(token, process.env.JWT_SECRET);
        const { userId, username } = userToken;
        req.user = { userId, username };
        next();
    } catch (error) {
        res.status(401).json({status: 'unauthorised', msg: "You are not authorised to access this route"});
    }
    
}
module.exports = authenticateUser;