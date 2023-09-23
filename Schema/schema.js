const mongoose = require("mongoose");

// Define a schema for your data
const projectRequestSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  number: String,
  companyName: String,
  service: String,
  budget: String,
});

// Create a model based on the schema
const projectRequest = mongoose.model("projectRequest", projectRequestSchema);

module.exports = projectRequest;
