const Streak = require("../models/Streak");

// GET all streaks
const getStreaks = async (req, res) => {
  try {
    const streaks = await Streak.find().sort({ createdAt: -1 });

    res.status(200).json(streaks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE streak
const addStreak = async (req, res) => {
  try {
    const { title, startDate, numberOfDays } = req.body;

    const streak = await Streak.create({
      title,
      startDate,
      numberOfDays,
    });

    res.status(201).json(streak);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TOGGLE streak completion for a particular date
const toggleStreakDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const streak = await Streak.findById(id);

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found",
      });
    }

    const alreadyCompleted =
      streak.completedDates.includes(date);

    if (alreadyCompleted) {
      // Uncheck the streak for this date
      streak.completedDates =
        streak.completedDates.filter(
          (completedDate) => completedDate !== date
        );
    } else {
      // Complete the streak for this date
      streak.completedDates.push(date);
    }

    const updatedStreak = await streak.save();

    res.status(200).json(updatedStreak);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE streak
const deleteStreak = async (req, res) => {
  try {
    const { id } = req.params;

    const streak = await Streak.findByIdAndDelete(id);

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found",
      });
    }

    res.status(200).json({
      message: "Streak deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStreaks,
  addStreak,
  toggleStreakDate,
  deleteStreak,
};