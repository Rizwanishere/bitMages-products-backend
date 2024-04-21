const express = require('express');

const productCtrl = require('../controllers/prdCtrl');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/',productCtrl.post);
router.get('/',productCtrl.get);    
router.get('/:id',productCtrl.getById);    
router.get('/page/:page/size/:size',productCtrl.get);    
router.delete('/:id', auth.authorizeAdmin, productCtrl.remove);
router.put('/:id',productCtrl.put);
router.patch('/:id',productCtrl.patch);

module.exports = router;