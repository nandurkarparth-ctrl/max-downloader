const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

// Home route (optional)
app.get("/api/download", async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.json({ error: "No URL provided" });
        }

        const downloadLink = `https://en.savefrom.net/1-youtube-video-downloader?url=${encodeURIComponent(url)}`;

        res.json({
            title: "Click below to download",
            download: downloadLink
        });

    } catch (err) {
        res.json({ error: "Server error" });
    }
});
// PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("✅ Max Downloader Backend Running 🚀");
});