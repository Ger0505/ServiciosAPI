let express = require("express");
let router = express.Router();
let mensajeController = require("../controllers/mensaje.controller");

router.get("/", mensajeController.select_mensajes);
router.get("/:id", mensajeController.select_mensaje);
// router.post("/login", mensajeController.login);
router.post("/insert", mensajeController.insert_mensaje);
router.put("/update", mensajeController.update_mensaje);
//router.delete("/delete/:id", mensajeController.delete_usuario);

module.exports = router;
