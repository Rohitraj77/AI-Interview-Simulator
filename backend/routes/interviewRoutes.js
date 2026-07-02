const express = require("express");

const router = express.Router();

const {
    generateInterview,
    evaluateInterview,
    getInterviewHistory,
    getInterviewById,
    deleteInterview
} = require("../controllers/interviewController");

// ==============================
// Generate AI Interview
// ==============================
router.post("/generate", generateInterview);

// ==============================
// Evaluate Interview
// ==============================
router.post("/evaluate", evaluateInterview);

// ==============================
// Get Interview History
// ==============================
router.get("/history", getInterviewHistory);

// ==============================
// Get Interview By ID
// ==============================
router.get("/:id", getInterviewById);

// ==============================
// Delete Interview
// ==============================
router.delete("/:id", deleteInterview);

module.exports = router;