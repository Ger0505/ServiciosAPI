var express = require('express');
var router = express.Router();
let usuController = require("../controllers/usuario.controller");
let empController = require("../controllers/empresa.controller");


/* GET home page. */
router.post('/usu', usuController.login);
router.post('/emp', empController.login);

module.exports = router;
