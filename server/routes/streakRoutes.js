const express = require("express");

const {
  getStreaks,
  addStreak,
  toggleStreakDate,
  deleteStreak,
} = require("../controllers/streakController");

const router = express.Router();

router.get("/", getStreaks);

router.post("/", addStreak);

router.put("/:id/toggle", toggleStreakDate);

router.delete("/:id", deleteStreak);

module.exports = router;