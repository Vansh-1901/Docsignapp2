// product wale file k middleware

const jwt = require('jsonwebtoken');
const ensureAuth = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = ensureAuth;