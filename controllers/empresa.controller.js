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

exports.login = (req, res) => {
  const { correo, password } = req.body
  Empresa.findOne({correo: correo}, (err, empresa)=>{
    if (err) return res.status(500).json({ code: 404, msg: err + "" });
    if(!empresa) return res.status(401).json({code: 401, msg: "1Verificar usuario y/o contraseña" })
    if (!empresa.validarPassword(password)) return res.status(401).json({ code: 401, msg: "2Verificar usuario y/o contraseña" });
    return res.status(200).json({ code: 200, empresa: empresa });
  })
}

exports.insert_empresa = (req, res) => {
  const { nombre, logo, descripcion, correo, direccion, telefono,
    password } = req.body;
  Empresa.findOne({ correo: correo }, (error, empresa) => {
    if (error) res.status(500).json(error +"")
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
        password
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

exports.insert_logo = (req, res) =>{
  const { _id, name } = req.body
  Empresa.findByIdAndUpdate(_id,{logo: name}, (err, result) => {
    if(err) return res.status(200).json({code: 200, status: "Error", msg: "Error al actualizar logo"})
    return res.status(200).json({code: 200, msg: "Imagen actualizada"})
  })  
}

exports.update_empresa = (req, res) => {
  const {
    _id,
    nombre,
    descripcion,
    correo,
    direccion,
    telefono
  } = req.body;
  let emp = {
    nombre,
    descripcion,
    telefono,
    direccion,
    correo
  };
  Empresa.findByIdAndUpdate(_id, emp, (error, result) => {
    if (error) res.status(500).json({ code: 404, msg: err + "" });
    res.status(200).json({
      code: 200,
      msg: "Empresa actualizado"
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
      return res
        .status(200)
        .json({ code: 200, status: "Error", msg: "Contraseña actual no es correcta" });
    }
  });
};

exports.delete_empresa = (req, res) => {
  const { id } = req.params;
  Empresa.findByIdAndDelete(id, (error, result) => {
    if (error) {
      res.status(500).json({ code: 404, msg: error + "" });
    }
    res.status(200).json({ code: 200, msg: "Empresa eliminada" });
  });
};
