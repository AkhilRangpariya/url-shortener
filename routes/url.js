const express = require('express');
const { handleGenerateNewShortURL } = require('../controllers/url');

const router = express.Router();

router.get('/', handleGenerateNewShortURL);

module.exports = router;