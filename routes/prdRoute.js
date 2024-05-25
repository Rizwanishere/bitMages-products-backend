const express = require('express');
const productCtrl = require('../controllers/prdCtrl');
const auth = require('../middlewares/auth');
const multer = require('multer');
const router = express.Router();

const drive = multer.diskStorage({
    filename: function (req, file, cb){
        const prefix = Math.round(Math.random()*1e9);
        const timestamp = Date.now();
        const filename = prefix + '-' + timestamp + '-' + file.originalname;
        req.body.image = filename;
        cb(null,filename);
    },
    destination: function (req, file, cb){
        cb(null, '../uploads/');
    }
});

const upload = multer({ storage: drive});
router.post('/',upload.single('image'),productCtrl.post);

router.get('/',productCtrl.get);    
router.get('/:id',productCtrl.getById);    
router.get('/page/:page/size/:size',productCtrl.get);    
router.delete('/:id', auth.authorizeAdmin, productCtrl.remove);
router.put('/:id',productCtrl.put);
router.patch('/:id',productCtrl.patch);
router.post('/:id/reviews',productCtrl.addReview);

module.exports = router;