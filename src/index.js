const test = require("./firebase.js");
console.log("Firebase loaded:", test);
const express = require("express");
const app = express();

const { createAlert } = require("../services/alertService"); // ✅ correct path

// Middleware
app.use(express.json());

// 🚨 SOS Alert API
app.post("/create-alert", async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;

    // Validation
    if (!userId || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const result = await createAlert(userId, { lat, lng });

    return res.status(200).json(result);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});