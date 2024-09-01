const apiOrganization = require('../api/organization');
const express = require('express');

const router = express.Router();

router.get('/', apiOrganization.FindAll);
router.get('/:id', apiOrganization.FindById);
router.put('/:id', apiOrganization.Update);
router.delete('/:id', apiOrganization.Delete);

module.exports = router;
