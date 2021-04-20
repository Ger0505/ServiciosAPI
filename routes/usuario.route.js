let express = require("express");
let router = express.Router();
let usuarioController = require("../controllers/usuario.controller");

router.get("/", usuarioController.select_usuarios);
router.get("/:id", usuarioController.select_usuario);
router.post("/login", usuarioController.login);
router.post("/insert", usuarioController.insert_usuario);
router.put("/update", usuarioController.update_usuario);
router.put("/resetPwd", usuarioController.update_Pwd);
router.delete("/delete/:id", usuarioController.delete_usuario);

module.exports = router;
