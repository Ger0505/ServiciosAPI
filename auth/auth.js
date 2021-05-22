const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    try{
        const token =  req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"2bacc9903277ae43809f0bd3d57bcfa9");
        req.usuario = decoded;
        next();
    }catch(error){
        res.status(401); // Error  de no autorizado
        res.json({code: 401, msg: "Acceso no autorizado"});
    }
}

module.exports = auth;