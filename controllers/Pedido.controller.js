const Pedido = require("../models/Pedido");

exports.select_pedidos = (req, res) => {
  Pedido.find({})
    .populate("empresa")
    .populate("usuario")
    .exec()
    .then((pedidos) => res.status(200).json(pedidos))
    .catch((error) => res.status(404).json({ code: 404, msg: error + "" }));
};

// (error, pedidos) => {
//   if (error) {
//     res.status(404).json({ code: 404, msg: error + "" });
//   }
//   res.status(200).json(pedidos);
// }

exports.select_pedido = (req, res) => {
  const { id } = req.params; //URL
  Pedido.findById(id, (error, pedido) => {
    if (error) {
      res.status(404).json({ code: 404, msg: error + "" });
    }
    res.status(200).json(pedido);
  });
};

exports.insert_mensaje = (req, res) => {
  const { fecha, hora, descripcion, _idrepartidor, _idusuario } = req.body;
  const msg = new Mensaje({
    fecha,
    descripcion,
    hora,
    repartidor: _idrepartidor,
    usuario: _idusuario
  });
  msg.save((error, result) => {
    if (error) return res.status(500).json({ code: 404, msg: error + "" });
    return res.status(200).json({
      code: 200,
      msg: "Mensaje insertado"
    });
  });
};
