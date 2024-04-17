const express = require('express');

const userController = require('../controllers/userCtrl');

const router = express.Router();

router.post('/',userController.add);

module.exports =  router;