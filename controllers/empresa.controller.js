const Empresa = require("../models/Empresa");

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

exports.insert_empresa = (req, res) => {
  const {
    nombre,
    logo,
    descripcion,
    correo,
    direccion,
    telefono,
    password
  } = req.body;
  Empresa.findOne({ correo: correo }, (error, empresa) => {
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

exports.delete_usuario = (req, res) => {
  const { id } = req.params;
  Empresa.findById(id, (error, result) => {
    if (error) {
      res.status(500).json({ code: 404, msg: error + "" });
    }
    res.status(200).json({ code: 200, msg: "Empresa eliminada" });
  });
};
