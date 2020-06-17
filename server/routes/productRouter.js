const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authorization = require('../middlewares/authorization');

router.post('/', productController.addProduct);
router.get('/', productController.getAll);
router.put('/:id', authorization, productController.update);
router.delete('/:id', authorization, productController.delete);

module.exports = router;
