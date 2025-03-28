// const { nanoid } = require('nanoid');
const { shortid } = require('shortid');

const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body) return res.status(400).json({ error: "url is required!" });

    // const shortID = nanoid(8);
    const shortID = shortid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClick: result.visitedHistory.length,
        analytics: result.visitedHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
}