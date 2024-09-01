const apiInventory = require('../api/inventory');
const express = require('express');

const router = express.Router();

router.get('/', apiInventory.FindAll);
router.get('/:id', apiInventory.FindById);
router.post('/', apiInventory.Create);
router.put('/:id', apiInventory.Update);
router.delete('/:id', apiInventory.Delete);

module.exports = router;
