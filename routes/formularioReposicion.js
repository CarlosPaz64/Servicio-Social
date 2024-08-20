const express = require('express');
const router = express.Router();
const reposicionController = require("../controllers/formularioReposicion");

router.post('/', reposicionController.registrarRepos);

module.exports = router;
