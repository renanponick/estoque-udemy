const apiUser = require('../api/user')
const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.get('/info', authMiddleware(), apiUser.FindById)
router.put('/', authMiddleware(), apiUser.Update)
router.delete('/', authMiddleware(), apiUser.Delete)

router.post('/', authMiddleware(['admin']), apiUser.Create)
router.get('/:id', authMiddleware(['admin']), apiUser.FindById)
router.get('/', authMiddleware(['admin']), apiUser.FindAll)
router.put('/:id', authMiddleware(['admin']), apiUser.Update)
router.delete('/:id', authMiddleware(['admin']), apiUser.Delete)

module.exports = router;
