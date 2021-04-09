const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PedidoSchema = new Schema({
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
    tipo:{ 
        type: String,
        trim: true,
        required: [true, "tipo es obligatorio"]
    },
    cantidad:{ 
        type: Number,
        required: [true, "cantidad es obligatorio"]
    },
    descripcion:{ 
        type: String,
        trim: true,
        required: [true, "descripción es obligatorio"]
    },
    empresa:{
        type: Schema.Types.ObjectId,
        required: [true, "empresa es obligatorio"],
        ref: "Empresa"
    },
    repartidor:{
        type: Schema.Types.ObjectId,
        required: [true, "repartidor es obligatorio"],
        ref: "Repartidor"
    },
    usuario:{
        type: Schema.Types.ObjectId,
        required: [true, "usuario es obligatorio"],
        ref: "Usuario",
    },
})

module.exports = mongoose.model("Pedido", PedidoSchema)