const Streak = require("../models/Streak");

// GET logged-in user's streaks
const getStreaks = async (req, res) => {
  try {
    const streaks = await Streak.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(streaks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE streak for logged-in user
const addStreak = async (req, res) => {
  try {
    const { title, startDate, numberOfDays } = req.body;

    if (!title || !startDate || !numberOfDays) {
      return res.status(400).json({
        message: "Title, start date and number of days are required",
      });
    }

    const streak = await Streak.create({
      user: req.user._id,
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

    const streak = await Streak.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found",
      });
    }

    const alreadyCompleted =
      streak.completedDates.includes(date);

    if (alreadyCompleted) {
      streak.completedDates =
        streak.completedDates.filter(
          (completedDate) => completedDate !== date
        );
    } else {
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

// DELETE logged-in user's streak
const deleteStreak = async (req, res) => {
  try {
    const { id } = req.params;

    const streak = await Streak.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found",
      });
    }

    await streak.deleteOne();

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