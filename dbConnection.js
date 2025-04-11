const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

connectToMongoDB("mongodb://localhost:27017/short-url"); // Fixed MongoDB URL

module.exports = connectToMongoDB;