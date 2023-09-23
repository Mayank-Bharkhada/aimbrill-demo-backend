const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json({ type: ["application/json", "text/plain"] }));
app.use(cors());

// Import the database connection and schema
const db = require("./Connection/connection");
const projectRequest = require("./Schema/schema");

app.get("/", (req, res) => {
  res.send("successful");
});

// Handle the POST request
app.post("/api/submit", async (req, res) => {
    // Access the submitted data in req.body
    const {
      fullName,
      email,
      number,
      companyName,
      service,
      budget,
    } = req.body;
  
    // Create a new record instance
    const newRecord = new projectRequest({
      fullName,
      email,
      number,
      companyName,
      service,
      budget,
    });
  
    try {
      // Save the record to the database using Promises
      await newRecord.save();
      console.log("Record saved successfully");
      res.json({ success: true, message: "Data received and saved successfully!" });
    } catch (err) {
      console.error("Error saving record:", err);
      res.status(500).json({  success: false, error: "Error saving record" });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
