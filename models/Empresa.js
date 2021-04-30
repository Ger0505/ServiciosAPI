const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10;

const validarEmail = function (email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
}

const EmpresaSchema = new Schema({
    nombre:{ 
        type: String,
        trim: true,
        required: [true, "nombre es obligatorio"]
    },
    logo:{ 
        type: String,
        required: [true, "logo es obligatorio"]
    },
    descripcion:{ 
        type: String,
        trim: true,
        required: [true, "descripción es obligatorio"]
    },
    correo:{ 
        type: String,
        trim:true,
        unique: true,
        required: [true, "correo es obligatorio"],
        validate: [validarEmail,"Ingrese un email válido"],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/
    },
    direccion:{ 
        type: String,
        required: [true, "dirección es obligatorio"]
    },
    telefono:{
        type: Number,
        required: [true, "teléfono es obligatorio"]
    },
    password:{ 
        type: String,
        required: [true, "password es obligatorio"]
    },
    tipo:{
        type: Number,
        required: [true, "tipo es obligatorio"]
    }
})

EmpresaSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

EmpresaSchema.statics.updatePwd = function (id, newPwd, cb) {
    const newPass = bcrypt.hashSync(newPwd, saltRounds)
    return this.findByIdAndUpdate(id, { password: newPass }, cb)
}

EmpresaSchema.methods.validarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("Empresa", EmpresaSchema)