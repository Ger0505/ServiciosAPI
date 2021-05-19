const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresa.controller");

router.get("/", empresaController.select_empresas);
router.get("/:id", empresaController.select_empresa);
router.get("/logo/:id", empresaController.select_logo);
router.post("/login", empresaController.login);
router.post("/insert", empresaController.insert_empresa);
router.put("/update", empresaController.update_empresa);
router.put("/update/logo", empresaController.update_logo);
router.put("/resetPwd", empresaController.update_Pwd);
router.delete("/delete/:id", empresaController.delete_empresa);

module.exports = router;
