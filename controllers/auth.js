const {response} = require("express");

const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const {generarJWT} = require("../helpers/jwt");



const crearUsuario = async (req, res = response) => {  // res = express.response es para tener el intelisense
    
    const {email, password} = req.body;
    
    try {

        // validamos que no haya un usuario con el mismo email
        let usuario = await Usuario.findOne({email}); // busca un usuario por email
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "un usuario ya existe con este correo"
            });
        }

        usuario = new Usuario(req.body); // creamos el usuario

        // Encriptar password
        const salt = bcrypt.genSaltSync();  // numero aleatorio para encriptar
        usuario.password = bcrypt.hashSync(password, salt); // encriptamos el password

        await usuario.save() // guarda el usuario en la base de datos


        // Generar json web token / JWT
        const token = await generarJWT(usuario.id, usuario.name);


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
    
}


const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({email}); // busca un usuario por email

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "el usuario no existe"
            });
        }

        // Confirmar password
        const validarPassword = bcrypt.compareSync(password, usuario.password); // comparamos el password ingresado con el password encriptado
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "el password es incorrecto"
            });
        }

        // Generar json web token / JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
    
}


const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // generar json web token / JWT
    const token = await generarJWT(uid, name);
    
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};