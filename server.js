const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json());

app.get("/convert-image", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).send("Missing image URL");

    // Fetch the image
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Convert to Base64
    const base64 = `data:${response.headers["content-type"]};base64,${Buffer.from(response.data).toString("base64")}`;
    
    res.send({ base64 });
  } catch (error) {
    res.status(500).send("Error converting image");
  }
});

app.listen(3002, () => console.log("🚀 Server running on port 3002"));
