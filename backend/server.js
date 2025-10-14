// server.js

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load menu.json safely
let menu = [];
try {
  menu = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
  console.log("Menu loaded successfully:", menu);
} catch (err) {
  console.error("Error reading menu.json:", err);
}

// Simple chat endpoint
app.post("/chat", (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();

    if (!menu.length) return res.json({ reply: "Menu not loaded yet." });

    let filtered = [...menu];

    // Map keywords to types
    if (userMessage.includes("vegetarian") || userMessage.includes("veg")) {
      filtered = filtered.filter(item => item.type.toLowerCase() === "veg");
    } else if (userMessage.includes("non-veg") || userMessage.includes("chicken") || userMessage.includes("meat")) {
      filtered = filtered.filter(item => item.type.toLowerCase() === "non-veg");
    }

    // Filter by item name
    const nameMatches = filtered.filter(item => userMessage.includes(item.name.toLowerCase()));
    if (nameMatches.length > 0) filtered = nameMatches;

    // Filter by price
    const priceMatch = userMessage.match(/\bunder (\d+)\b/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      filtered = filtered.filter(item => item.price <= maxPrice);
    }

    if (!filtered.length) return res.json({ reply: "Sorry, no items match your query." });

    const reply = filtered
      .map(item => `${item.name} - ${item.description} (${item.price}/-)`)
      .join("\n");

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error." });
  }
});




// Test GET endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
