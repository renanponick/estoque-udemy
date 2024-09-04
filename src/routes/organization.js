const apiOrganization = require('../api/organization');
const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware(['admin']), apiOrganization.Create);
router.get('/', authMiddleware(['admin']), apiOrganization.FindById);
router.put('/', authMiddleware(['admin']), apiOrganization.Update);
router.delete('/', authMiddleware(['admin']), apiOrganization.Delete);

module.exports = router;
