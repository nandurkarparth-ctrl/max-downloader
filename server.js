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

        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        console.log("URL:", url);

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

    } catch (err) {
        console.log("FULL ERROR:", err);

        res.json({
            error: "Server error",
            details: err.message   // 👈 IMPORTANT LINE
        });
    }
});