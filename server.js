const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

// Home route (optional)
app.get("/", (req, res) => {
    res.send("Max Downloader Backend Running 🚀");
});

// Download API
const axios = require("axios");

app.get("/api/download", async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.json({ error: "No URL provided" });
        }

        // Example free API (you can change later)
        const api = `https://api.vevioz.com/api/button/mp4?url=${encodeURIComponent(url)}`;

        res.json({
            title: "Click below to download",
            download: api
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