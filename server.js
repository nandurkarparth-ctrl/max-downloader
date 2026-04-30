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

        res.json({
            title: "Choose download option",
            links: [
                `https://ssyoutube.com/watch?v=${url.split("v=")[1]}`,
                `https://y2mate.is/watch?v=${url.split("v=")[1]}`,
                `https://9xbuddy.com/process?url=${encodeURIComponent(url)}`
            ]
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