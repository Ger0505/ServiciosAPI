const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/Pedido.controller");

router.get("/", pedidoController.select_pedidos);
// router.get("/:id", pedidoController.select_empresa);
// router.post("/login", pedidoController.login);
// router.post("/insert", pedidoController.insert_empresa);
// router.put("/update", pedidoController.update_empresa);
// router.put("/update/logo", pedidoController.update_logo);
// router.put("/resetPwd", pedidoController.update_Pwd);
// router.delete("/delete/:id", pedidoController.delete_empresa);

module.exports = router;
