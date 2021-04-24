const Usuario = require("../models/Usuario");

exports.select_usuarios = (req, res) => {
  Usuario.find({}, (err, usuarios) => {
    if (err) res.status(404).json({ code: 404, msg: err + "" });
    res.status(200).json(usuarios);
  });
};

exports.select_usuario = (req, res) => {
  const { id } = req.params; //URL
  Usuario.findById(id, (err, usuario) => {
    if (err) res.status(404).json({ code: 404, msg: err + "" });
    res.status(200).json(usuario);
  });
};

exports.login = (req, res) => {
  const { correo, password } = req.body;
  Usuario.findOne({ correo: correo }, (err, usuario) => {
    if (err) return res.status(500).json({ code: 404, msg: err + "" });
    if (!usuario)
      return res
        .status(401)
        .json({ code: 401, msg: "Verificar usuario y/o contraseña" });
    if (!usuario.validarPassword(password))
      return res
        .status(401)
        .json({ code: 401, msg: "Verificar usuario y/o contraseña" });
    return res.status(200).json({ code: 200, usuario: usuario });
  });
};

exports.insert_usuario = (req, res) => {
  const { nombre, apellidos, telefono, direccion, correo, password } = req.body;
  Usuario.findOne({correo: correo}, (err, usuario) =>{
    if(usuario) return res.status(200).json({ code: 200, status: "Error", msg: "El correo ya es utilizado por un usuario existente" })
    let user = new Usuario({
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      direccion: direccion,
      correo: correo,
      password: password
    });
    user.save((err, result) => {
      if (err) return res.status(500).json({ code: 404, msg: err + "" });
      return res.status(200).json({
        code: 200,
        msg: "Usuario insertado"
      });
    });
  });
};

exports.update_usuario = (req, res) => {
  const { _id, nombre, apellidos, telefono, direccion, correo } = req.body;
  let user = {
    nombre: nombre,
    apellidos: apellidos,
    telefono: telefono,
    direccion: direccion,
    correo: correo
  };
  Usuario.findByIdAndUpdate(_id, user, (err, result) => {
    if (err) res.status(500).json({ code: 404, msg: err + "" });
    res.status(200).json({
      code: 200,
      msg: "Usuario actualizado"
    });
  });
};

exports.update_Pwd = (req, res) => {
  const { actual, nuevo, _id } = req.body;
  Usuario.findById(_id, (err, usuario) => {
    if (err)
      return res
        .status(500)
        .json({ code: 500, msg: "Error al buscar usuario" });
    if (usuario.validarPassword(actual)) {
      Usuario.updatePwd(_id, nuevo, (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ code: 500, msg: "Error al actualizar contraseña" });
        return res
          .status(200)
          .json({ code: 200, msg: "Contraseña actualizada" });
      });
    } else {
      return res
        .status(200)
        .json({ code: 200, msg: "Contraseña actual no es correcta" });
    }
  });
};

exports.delete_usuario = (req, res) => {
  const { id } = req.params;
  Usuario.findByIdAndDelete(id, (err, result) => {
    if (err) res.status(500).json({ code: 404, msg: err + "" });
    res.status(200).json({
      code: 200,
      msg: "Usuario eliminado"
    });
  });
};
