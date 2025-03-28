const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.find({ shortId });

    return result.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
};

module.exports = connectToMongoDB;