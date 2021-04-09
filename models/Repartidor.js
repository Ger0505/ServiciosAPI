const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RepartidorSchema = new Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        required: [true, "usuario es obligatorio"],
        ref: "Usuario",
    },
    empresa:{
        type: Schema.Types.ObjectId,
        required: [true, "empresa es obligatorio"],
        ref: "Empresa"
    }
})

module.exports = mongoose.model("Repartidor", RepartidorSchema)