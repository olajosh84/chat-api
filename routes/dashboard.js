const router = require('express').Router();
const dashboard = require('../controllers/dashboard');

router.get('/', dashboard);

module.exports = router;