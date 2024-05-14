const jwt = require("jsonwebtoken");
const adminMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(403).send('This operation need auth');
    }
    try{
        const decodeToken = await jwt.verify(token, process.env.JWT_TOKEN);
        if(decodeToken.accountType === 'admin'){
            return next()
        }
        return res.status(401).send('Not authorize')
    }
    catch(err){
        return res.status(401).send('Token is invalid');
    }
}

module.exports = adminMiddleware;