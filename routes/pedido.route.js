const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller");

router.get("/", pedidoController.select_pedidos);
// router.get("/:id", pedidoController.select_empresa);
// router.post("/login", pedidoController.login);
// router.post("/insert", pedidoController.insert_empresa);
// router.put("/update", pedidoController.update_empresa);
// router.put("/update/logo", pedidoController.update_logo);
// router.put("/resetPwd", pedidoController.update_Pwd);
// router.delete("/delete/:id", pedidoController.delete_empresa);
router.get("/usu/:id", pedidoController.select_pedidos_usuario);
router.get("/emp/:id", pedidoController.select_pedidos_empresa);
router.post("/insert", pedidoController.insert_pedido);
router.post("/insert/rep", pedidoController.insert_repartidor);
router.put("/update", pedidoController.update_pedido);
router.delete("/delete", pedidoController.delete_pedido);

module.exports = router;
