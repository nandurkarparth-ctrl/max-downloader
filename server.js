const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/download", async (req, res) => {
    try {
        const url = req.query.url;

        if (!ytdl.validateURL(url)) {
            return res.json({ error: "Invalid YouTube URL" });
        }

        const info = await ytdl.getInfo(url);

        const title = info.videoDetails.title;

        const format = ytdl.chooseFormat(info.formats, {
            quality: "18"
        });

        res.json({
            title: title,
            download: format.url
        });

    } catch (err) {
        res.json({ error: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("✅ Max Downloader Backend Running 🚀");
});