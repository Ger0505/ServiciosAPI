const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller");

router.get("/", pedidoController.select_pedidos);
router.get("/usu/:id", pedidoController.select_pedidos_usuario);
router.get("/emp/:id", pedidoController.select_pedidos_empresa);
router.post("/insert", pedidoController.insert_pedido);
router.post("/insert/rep", pedidoController.insert_repartidor);
router.put("/update", pedidoController.update_pedido);
router.delete("/delete", pedidoController.delete_pedido);
router.get("/gb/:id", pedidoController.groupby_repartidor)
router.get("/gb/t/:id", pedidoController.groupby_diario)
router.get("/gb/v/:id", pedidoController.groupby_ventas)

module.exports = router;
