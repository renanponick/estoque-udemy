const apiProduct = require('../api/product');
const express = require('express');

const router = express.Router();

router.get('/', apiProduct.FindAll);
router.get('/:id', apiProduct.FindById);
router.post('/', apiProduct.Create);
router.put('/:id', apiProduct.Update);
router.delete('/:id', apiProduct.Delete);

module.exports = router;