const {response} = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {

    // x-token HEADER
    const token = req.header('x-token');

    // si no viene el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {


        const payload = jwt.verify(token, process.env.JWT_SECRET);  // tomamos el payload del token

        req.uid = payload.uid;
        req.name = payload.name;
        

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}   


module.exports = {
    validarJWT
}