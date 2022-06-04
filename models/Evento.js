const mongoose = require('mongoose');

const EventoSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EventoSchema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})



// esto es como un create table en sql

module.exports = mongoose.model('Evento', EventoSchema);
// en mongo se llama usuarios porque mongoose asume que queremos una coleccion de usuarios