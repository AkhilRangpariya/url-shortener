const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

router.get('/', handleGenerateNewShortURL);

app.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;