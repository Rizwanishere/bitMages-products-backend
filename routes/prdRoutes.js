const express = require('express');

const productCtrl = require('../controllers/prdCtrl');

const router = express.Router();

router.get('/',productCtrl.get);    

module.exports = router;