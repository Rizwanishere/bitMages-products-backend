const express = require('express');
const bookCtrl = require('../controllers/bookCtrl');

const router = express.Router();

router.get('/books',bookCtrl.books);
router.post('/books',bookCtrl.post);
router.delete('/books/:id',bookCtrl.remove);
router.get('/authors',bookCtrl.authors);
router.get('/books/:id',bookCtrl.getById);

module.exports = router;