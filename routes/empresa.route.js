let express = require("express");
let router = express.Router();
let empresaController = require("../controllers/empresa.controller");

router.get("/", empresaController.select_empresas);
router.get("/:id", empresaController.select_empresa);
router.post("/login", empresaController.login);
router.post("/insert", empresaController.insert_empresa);
router.put("/update", empresaController.update_empresa);
router.put("/resetPwd", empresaController.update_Pwd);
router.delete("/delete/:id", empresaController.delete_usuario);

module.exports = router;