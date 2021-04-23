const Mensaje = require("../models/Mensaje");

exports.select_mensajes = (req, res) => {
  Mensaje.find({}, (error, mensajes) => {
    if (error) {
      res.status(404).json({ code: 404, msg: error + "" });
    }
    res.status(200).json(mensajes);
  });
};

exports.select_mensaje = (req, res) => {
  const { id } = req.params; //URL
  Mensaje.findById(id, (error, mensaje) => {
    if (error) {
      res.status(404).json({ code: 404, msg: error + "" });
    }
    res.status(200).json(mensaje);
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

exports.update_mensaje = (req, res) => {
  const { _id, descripcion } = req.body;
  let msg = {
    descripcion
  };
  Mensaje.findByIdAndUpdate(_id, msg, (err, result) => {
    if (err) res.status(500).json({ code: 404, msg: err + "" });
    res.status(200).json({
      code: 200,
      msg: "Empresa actualizado"
    });
  });
};
