const apiInventoryMovement = require('../api/inventoryMovement');
const express = require('express');

const router = express.Router();

router.get('/', apiInventoryMovement.FindAll);
router.get('/:id', apiInventoryMovement.FindById);
router.post('/', apiInventoryMovement.Create);
router.put('/:id', apiInventoryMovement.Update);
router.delete('/:id', apiInventoryMovement.Delete);

module.exports = router;