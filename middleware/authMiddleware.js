const jwt = require('jsonwebtoken');
const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token;

    if(!token){
        return res.status(403).send('This operation need auth');
    }
    try{
        const decodeToken = await jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decodeToken;
        next()
    }
    catch(err){
        return res.status(401).send('Token is invalid');
    }
}

module.exports = verifyToken;