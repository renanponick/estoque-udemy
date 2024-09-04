const apiInventory = require('../api/inventory');
const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware(), apiInventory.FindAll);
router.get('/:id', authMiddleware(), apiInventory.FindById);
router.post('/', authMiddleware(), apiInventory.Create);
router.put('/:id', authMiddleware(), apiInventory.Update);
router.delete('/:id', authMiddleware(), apiInventory.Delete);

module.exports = router;
