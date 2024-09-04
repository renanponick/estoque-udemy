const apiInventoryMovement = require('../api/inventoryMovement');
const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/:inventoryId', authMiddleware(), apiInventoryMovement.FindAllByInventory);
router.get('/:inventoryId/:id', authMiddleware(), apiInventoryMovement.FindById);
router.post('/:inventoryId', authMiddleware(), apiInventoryMovement.Create);
router.put('/:inventoryId/:id', authMiddleware(), apiInventoryMovement.Update);
router.delete('/:inventoryId/:id', authMiddleware(), apiInventoryMovement.Delete);

module.exports = router;