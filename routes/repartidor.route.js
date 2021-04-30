const express = require("express");
const router = express.Router();
const repartidorController = require("../controllers/repartidor.controller");

router.get("/", repartidorController.select_repartidores);
router.get("/:id", repartidorController.select_rep_empresa);
router.post("/insert", repartidorController.insert_repartidor);
router.put("/update", repartidorController.update_repartidor);
router.delete("/delete/:id", repartidorController.delete_repartidor);

module.exports = router;
