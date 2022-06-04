// Rutas de usuarios / Auth
// host + /api/auth

const express = require("express");
const {check} = require("express-validator")
const router = express.Router();

const {validarCampos} = require("../middlewares/validar-campos"); // custom middleware
const {validarJWT} = require("../middlewares/validar-jwt"); 

const {crearUsuario, loginUsuario, revalidarToken} = require("../controllers/auth");


router.post('/new', 
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(), // el nombre es obligatorio y no puede estar vacio
        check('email', 'el email es obligatorio').isEmail(), // el email debe ser un email
        check('password', 'el password debe tener mas de 6 caracterez').isLength({min:6}), // el password es obligatorio y no puede estar vacio
        validarCampos // el custom middleware va al final
    ] 
    , crearUsuario);

router.post('/', 
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe tener mas de 6 caracterez').isLength({min:6}),
        validarCampos
    ]
    , loginUsuario);



router.get('/renew', validarJWT, revalidarToken);


module.exports = router;