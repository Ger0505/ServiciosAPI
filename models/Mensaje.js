const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MensajeSchema = new Schema({
    fecha:{ 
        type: String,
        trim: true,
        required: [true, "fecha es obligatorio"]
    },
    hora:{ 
        type: String,
        trim: true,
        required: [true, "hora es obligatorio"]
    },
    descripcion:{ 
        type: String,
        trim: true,
        required: [true, "descripción es obligatorio"]
    },
    repartidor:{
        type: Schema.Types.ObjectId,
        required: [true, "repartidor es obligatorio"],
        ref: "Repartidor",
    },
    usuario:{
        type: Schema.Types.ObjectId,
        required: [true, "usuario es obligatorio"],
        ref: "Usuario",
    }
})

module.exports = mongoose.model("Mensaje", MensajeSchema)