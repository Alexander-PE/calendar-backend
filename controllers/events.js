const {response} = require('express');
const Evento  = require("../models/Evento");

const getEventos = async (req, res = response) => {

    // console.log(req.uid);   
    const eventos = await Evento.find()     //  busca todos los eventos
        .populate('user', 'name')     // para sacar del user el campo de name

    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {

    // console.log(req);
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

const actualizarEvento = async (req, res = response) => {


    const eventoId = req.params.id;
    const uid = req.uid;  // es el id del usuario que esta logueado en la app

    try {

        // const evento = await Evento.findByIdAndUpdate(eventoId, req.body, {new: true});
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: "No existe el evento"
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "No tienes permisos para actualizar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});
        res.json({
            ok: true,
            evento: eventoActualizado
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }


}

const eliminarEvento = async (req, res = response) => {


    const eventoId = req.params.id;
    const uid = req.uid;  // es el id del usuario que esta logueado en la app

    try {

        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: "No existe el evento"
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "No tienes permisos para actualizar este evento"
            })
        }

        await Evento.findByIdAndRemove(eventoId);
        res.json({
            ok: true, 
            msg: "Evento eliminado"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}