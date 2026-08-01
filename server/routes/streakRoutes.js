const express = require("express");

const {
  getStreaks,
  addStreak,
  toggleStreakDate,
  deleteStreak,
} = require("../controllers/streakController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All streak routes require JWT authentication
router.get("/", protect, getStreaks);

router.post("/", protect, addStreak);

router.put("/:id/toggle", protect, toggleStreakDate);

router.delete("/:id", protect, deleteStreak);

module.exports = router;