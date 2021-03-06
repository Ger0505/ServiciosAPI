const moment = require("moment");
moment.locale("es-mx");
const Pedido = require("../models/Pedido");
const Repartidor = require("../models/Repartidor")
const mongoose = require('mongoose')

exports.groupby_diario = (req,res) =>{
  const { id } = req.params
  Pedido.aggregate()
  .match({empresa: mongoose.Types.ObjectId(id), fecha: moment().format("L")})
  .group({_id: null, pedidos: { $sum: 1 }, ventas: { $sum: "$precio"}})
  .then(ped => {
    Repartidor.aggregate()
    .match({empresa: mongoose.Types.ObjectId(id)})
    .group({_id: null, sum: { $sum: 1 }})
    .then(rep => {
      Pedido.aggregate()
      .match({repartidor: {$exists: false}, empresa: mongoose.Types.ObjectId(id), fecha: moment().format("L")})
      .group({_id: null, sum:{ $sum:1 }})
      .then(ped2 =>{
        if(ped.length === 0) ped[0] = {_id: null, pedidos: 0, ventas: 0.0}
        if(rep.length === 0) ped[0].repartidores = 0
        else ped[0].repartidores = rep[0].sum
        if(ped2.length === 0) ped[0].nulos = 0
        else ped[0].nulos = ped2[0].sum
        res.status(200).json(ped[0])
      })
    })
  })
  .catch(err => res.status(404).json({msg: err + ""}))
}

exports.groupby_ventas = (req, res) =>{
  const { id } = req.params
  Pedido.aggregate()
  .match({empresa: mongoose.Types.ObjectId(id)})
  .group({_id: '$fecha', pedidos: { $sum: 1 }, ventas: { $sum: "$precio"}})
  .sort({_id: -1})
  .then(ped => res.status(200).json(ped))
  .catch(err => res.status(404).json({msg: err + ""}))
}

exports.groupby_repartidor = (req, res) =>{
  const { id } = req.params
  Pedido.aggregate()
  .match({empresa: mongoose.Types.ObjectId(id)})
  .group({ _id: '$repartidor', pedidos: { $sum: 1 }, ventas: { $sum: "$precio"} })
  .sort({_id: 1})
  .then(ped => res.status(200).json(ped))
  .catch(err => res.status(404).json({msg: err + ""}))
}

exports.select_pedidos = (req, res) => {
  Pedido.find({})
    .populate("empresa")
    .populate("usuario")
    .exec()
    .then((pedidos) => res.status(200).json(pedidos))
    .catch((error) => res.status(404).json({ code: 404, msg: error + "" }));
};

exports.select_pedidos_usuario = (req, res) => {
  const { id } = req.params;
  Pedido.find({ usuario: id }, (error, pedidos) => {
    if (error) {
      res.status(404).json({ code: 404, msg: error + "" });
    }
    res.status(200).json(pedidos);
  });
};

exports.select_pedidos_empresa = (req, res) =>{
  const { id } = req.params
  Pedido.find({empresa: id})
    .populate({path:"usuario", select: "nombre apellidos direccion telefono" })
    .populate("repartidor")
    .populate("usuario")
    .exec()
    .then((pedidos) => res.status(200).json(pedidos))
    .catch((error) => res.status(404).json({ code: 404, msg: error + "" }));
};

exports.insert_pedido = (req, res) => {
  const { tipo, cantidad, precio, descripcion, empresa, usuario } = req.body;
  let ped = new Pedido({
    fecha: moment().format("L"),
    hora: moment().format("LT"),
    tipo,
    cantidad,
    precio,
    descripcion,
    empresa,
    usuario
  });
  ped.save((err, result) => {
    if (err)
      return res
        .status(500)
        .json({ code: 500, status: "Error", msg: "Error al guardar pedido" });
    return res.status(200).json({ code: 200, msg: "Pedido insertado" });
  });
};

exports.insert_repartidor = (req, res) => {
  const { idPed, idRep } = req.body;
  Pedido.findByIdAndUpdate(idPed, { repartidor: idRep }, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ code: 500, status: "Error", msg: "Error al actulizar" });
    return res.status(200).json({ code: 200, msg: "Repartidor Asignado" });
  });
};

exports.update_pedido = (req, res) => {
  const { _id, cantidad, precio } = req.body;
  Pedido.findByIdAndUpdate(
    _id,
    { cantidad: cantidad, precio: precio },
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ code: 500, status: "Error", msg: "Error al actulizar" });
      return res.status(200).json({ code: 200, msg: "Pedido Actualizado" });
    }
  );
};

exports.delete_pedido = (req, res) => {
  const { id } = req.params;
  Pedido.findByIdAndDelete(id)
    .exec()
    .then((pedidos) => res.status(200).json(pedidos))
    .catch((error) => res.status(404).json({ code: 404, msg: error + "" }));
};
