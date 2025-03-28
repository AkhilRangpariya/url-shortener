const express = require('express');
const router = require('./routes/url');

const connectToMongoDB = require("./dbConnection");
const URL = require('./models/url');

const app = express();
const PORT = 8001;


connectToMongoDB("mongodb://localhost:2701/short-url");

app.use(express.json());
app.use("/url", router);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});

    return res.send(`
        <html>
            <head>
                <title>Go to URL shortener</title>
            </head>
            <body>
                <ol>
                    ${allUrls.map((url, index) => (`<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join(''))}
                </ol >
            </body >
        </html > `)
})

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        }
    );

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server Started listening on ${PORT} `))

