const jwt = require("jsonwebtoken");
const Empresa = require("../models/Empresa");
const Pedido = require("../models/Pedido");
const Repartidor = require("../models/Repartidor");

exports.select_empresas = (req, res) => {
  Empresa.find({}, (error, empresas) => {
    if (error) {
      res.status(404).json({ code: 404, msg: error + "" });
    }
    res.status(200).json(empresas);
  });
};

exports.select_empresa = (req, res) => {
  const { id } = req.params; //URL
  Empresa.findById(id, (error, empresa) => {
    if (error) {
      res.status(404).json({ code: 404, msg: error + "" });
    }
    res.status(200).json(empresa);
  });
};

exports.select_logo = (req, res) =>{
  const { id } = req.params
  Empresa.findById(id)
  .then(emp => res.status(200).json({logo: emp.logo}))
  .catch(err => res.status(404).json({ code: 404, msg: error + "" }))
}

exports.login = (req, res) => {
  const { correo, password } = req.body;
  Empresa.findOne({ correo: correo }, (err, empresa) => {
    if (err) return res.status(500).json({ code: 404, msg: err + "" });
    if (!empresa)
      return res
        .status(401)
        .json({ code: 401, msg: "1Verificar usuario y/o contraseña" });
    if (!empresa.validarPassword(password))
      return res
        .status(401)
        .json({ code: 401, msg: "2Verificar usuario y/o contraseña" });
    
    let token = jwt.sign({
      id: empresa._id,
      nombre: empresa.nombre
    },"2bacc9903277ae43809f0bd3d57bcfa9",{expiresIn: 60 * 60})
    return res.status(200).json({ code: 200, token: token, empresa: empresa });
  });
};

exports.insert_empresa = (req, res) => {
  const {
    nombre,
    logo,
    descripcion,
    correo,
    direccion,
    telefono,
    password,
    tipo
  } = req.body;
  Empresa.findOne({ correo: correo }, (error, empresa) => {
    if (error)
      return res
        .status(500)
        .json({ code: 500, status: "Error", msg: "Error al insertar empresa" });
    if (empresa)
      return res.status(200).json({
        code: 200,
        status: "Error",
        msg: "El correo ya es utilizado por una empresa existente"
      });
    let emp = new Empresa({
      nombre,
      logo,
      descripcion,
      telefono,
      direccion,
      correo,
      password,
      tipo
    });
    emp.save((error, result) => {
      if (error) return res.status(500).json({ code: 404, msg: error + "" });
      return res.status(200).json({
        code: 200,
        msg: "Empresa insertada"
      });
    });
  });
};

exports.update_logo = (req, res) => {
  const { _id, name } = req.body;
  Empresa.findByIdAndUpdate(_id, { logo: name }, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ code: 500, status: "Error", msg: "Error al actualizar logo" });
    return res.status(200).json({ code: 200, msg: "Imagen actualizada" });
  });
};

exports.update_empresa = (req, res) => {
  const { _id, nombre, descripcion, correo, direccion, telefono } = req.body;
  let emp = {
    nombre,
    descripcion,
    telefono,
    direccion,
    correo
  };
  Empresa.findByIdAndUpdate(_id, emp, (err, result) => {
    if (err) res.status(500).json({ code: 404, msg: err + "" });
    res.status(200).json({
      code: 200,
      msg: "Usuario actualizado"
    });
  });
};

exports.update_Pwd = (req, res) => {
  const { actual, nuevo, _id } = req.body;
  Empresa.findById(_id, (err, empresa) => {
    if (err)
      return res
        .status(500)
        .json({ code: 500, msg: "Error al buscar la empresa" });
    console.log(empresa);
    if (empresa.validarPassword(actual)) {
      Empresa.updatePwd(_id, nuevo, (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ code: 500, msg: "Error al actualizar contraseña" });
        return res
          .status(200)
          .json({ code: 200, msg: "Contraseña actualizada" });
      });
    } else {
      return res.status(200).json({
        code: 200,
        status: "Error",
        msg: "Contraseña actual no es correcta"
      });
    }
  });
};

exports.delete_empresa = (req, res) => {
  const { id } = req.params;

  Pedido.deleteMany({ empresa: id })
    .then((res) => {
      Repartidor.deleteMany({ empresa: id }).then((res) => {
        Empresa.findByIdAndDelete(id).then((res) =>
          res.status(200).json({ code: 200, msg: "Empresa eliminada" })
        );
      });
    })
    .catch((err) =>
      res.status(500).json({ code: 500, status: "Error", msg: err + "" })
    );
};
