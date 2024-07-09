const express = require('express');
const { getTotalCount } = require('../controllers/totalCountController');

const router = express.Router();

router.get('/gettotalcount', getTotalCount);

module.exports = router;
