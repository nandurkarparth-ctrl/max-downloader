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
app.get("/api/download", async (req, res) => {
    try {
        let url = req.query.url;

        if (!url) {
            return res.json({ error: "No URL provided" });
        }

        // Fix Shorts URL
        if (url.includes("shorts")) {
            const id = url.split("/shorts/")[1].split("?")[0];
            url = `https://www.youtube.com/watch?v=${id}`;
        }

        // Ensure https
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        console.log("Using URL:", url);

        const info = await ytdl.getInfo(url);

        const format = ytdl.chooseFormat(info.formats, {
            quality: "18"
        });

        if (!format || !format.url) {
            return res.json({ error: "No downloadable format found" });
        }

        res.json({
            title: info.videoDetails.title,
            download: format.url
        });

    } catch (err) {   // ✅ FIXED
        console.log("ERROR:", err.message);

        res.json({
            error: "Server error",
            details: err.message
        });
    }
});

// PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("✅ Max Downloader Backend Running 🚀");
});