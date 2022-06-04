const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});


// esto es como un create table en sql


module.exports = mongoose.model('Usuario', UsuarioSchema);
// en mongo se llama usuarios porque mongoose asume que queremos una coleccion de usuarios