const Repartidor = require("../models/Repartidor")
const Usuario = require("../models/Usuario")

exports.select_repartidores = (req, res) => {
    Repartidor.find({})
        .populate("usuario")
        .exec()
        .then(repartidores => res.status(200).json(repartidores))
        .catch(err => res.status(404).json({ code: 404, msg: error + "" }))
}

exports.select_rep_empresa = (req, res) => {
    const { id } = req.params
    Repartidor.find({ empresa: id })
        .populate("usuario")
        .exec()
        .then(repartidores => res.status(200).json(repartidores))
        .catch(err => res.status(404).json({ code: 404, msg: error + "" }))
}

exports.insert_repartidor = (req, res) => {
    const { nombre, apellidos, telefono, direccion, correo, empresa } = req.body
    let usu = new Usuario({
        nombre,
        apellidos,
        telefono,
        direccion,
        correo
    })
    usu.save()
    .then(result => {
        let rep = new Repartidor({ usuario: result._id, empresa })
        rep.save()
        .then(result => res.status(200).json({ code: 200, msg: "Repartidor insertado" }))
        .catch(err => res.status(404).json({ code: 404, status: "Error", msg: err + "" }))
    })
    .catch(err => res.status(404).json({ code: 404, status: "Error", msg: err + "" }))
}

exports.update_repartidor = (req, res) => {
    const {_id, nombre, apellidos, telefono, direccion, correo } = req.body
    Repartidor.findById(_id)
    .then(rep => {
        Usuario.findByIdAndUpdate(rep.usuario,{
            nombre,
            apellidos,
            telefono,
            direccion,
            correo
        })
        .then( result => res.status(200).json({code: 200, msg: "Repartidor actualizado"}))
    })
    .catch(err => res.status(404).json({ code: 404, status: "Error", msg: err + "" }))
}

exports.delete_repartidor = (req, res) =>{
    const { id } = req.params
    Repartidor.findById(id)
    .then(rep => {
        Usuario.findByIdAndDelete(rep.usuario)
        .then(result => {
            Repartidor.findByIdAndDelete(id)
            .then(result => res.status(200).json({code: 200, msg: "Repartidor eliminado"}))
        })
    })
    .catch(err => res.status(404).json({ code: 404, msg: error + "" }))
}