const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const saltRounds = 10;

const validarEmail = function (email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return regex.test(email);
}

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, "nombre es obligatorio"]
    },
    apellidos: {
        type: String,
        trim: true,
        required: [true, "apellidos son obligatorios"]
    },
    telefono: {
        type: Number,
        required: [true, "teléfono es obligatorio"]
    },
    direccion: {
        type: String,
        required: [true, "dirección es obligatorio"]
    },
    correo: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "correo es obligatorio"],
        validate: [validarEmail, "Ingrese un email válido"],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/
    },
    password: {
        type: String,
        trim: true
    }
})

UsuarioSchema.pre('save', function (next) {
    if(this.password)
        this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

UsuarioSchema.statics.updatePwd = function (id, newPwd, cb) {
    const newPass = bcrypt.hashSync(newPwd, saltRounds)
    return this.findByIdAndUpdate(id, { password: newPass }, cb)
}

UsuarioSchema.methods.validarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("Usuario", UsuarioSchema)