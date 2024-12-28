const express = require("express");
const fetch = require("node-fetch");
const app = express();
const config = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Serve static files from the public folder
app.use(express.static("public"));

// API route to fetch quotes
app.get("/api/quotes", async (req, res) => {
    try {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: { "X-Api-Key": API_KEY },
        });
        const data = await response.json();
        const quote = data[0];

        res.json({
            quote: quote.quote,
            author: quote.author || unknown,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch quotes." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
