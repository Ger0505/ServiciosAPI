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
  Mensaje.findOne({ correo: correo }, (error, empresa) => {
    if (empresa)
      return res.status(200).json({
        code: 200,
        msg: "El correo ya es utilizado por un usuario existente"
      });
    let emp = new Empresa({
      nombre,
      logo,
      descripcion,
      telefono,
      direccion,
      correo,
      password
    });
    emp.save((error, result) => {
      if (error) return res.status(500).json({ code: 404, msg: error + "" });
      return res.status(200).json({
        code: 200,
        msg: "Empresa insertado"
      });
    });
  });
};
