const apiProduct = require('../api/product');
const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware(), apiProduct.FindAll);
router.get('/:id', authMiddleware(), apiProduct.FindById);
router.post('/', authMiddleware(), apiProduct.Create);
router.put('/:id', authMiddleware(), apiProduct.Update);
router.delete('/:id', authMiddleware(), apiProduct.Delete);

module.exports = router;