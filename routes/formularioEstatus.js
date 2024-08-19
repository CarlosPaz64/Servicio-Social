const express = require('express');
const router = express.Router();
const estatusController = require("../controllers/formularioEstatus");

router.post('/', estatusController.registrarEstatus);

module.exports = router;
