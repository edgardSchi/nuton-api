const express = require('express');
const router = express.Router();
module.exports = router

router.use('/api/versions', require('./version.routes'));
