const express = require("express");
const {check} = require("express-validator")
const router = express.Router();

const {validarJWT} = require("../middlewares/validar-jwt"); 
const {validarCampos} = require("../middlewares/validar-campos");
const {isDate} = require("../helpers/isDate");


const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require("../controllers/events");


// Todas deben validarse por el jwt
router.use(validarJWT); // para que todas las rutas debajo que sean de eventos se validen por el jwt - middleware


// Obtener eventos 
router.get("/", getEventos);


// Crear eventos
router.post("/",
    [
        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check("start", "Fecha de inicio es obligatorio").custom(isDate),
        check("end", "Fecha de fin es obligatorio").custom(isDate),
        validarCampos
    ],
    crearEvento);


// Actualizar eventos
router.put("/:id",
    [
        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check("start", "Fecha de inicio es obligatorio").custom(isDate),
        check("end", "Fecha de fin es obligatorio").custom(isDate),
        validarCampos
    ], actualizarEvento);


// Actualizar eventos
router.delete("/:id", eliminarEvento);



module.exports = router;