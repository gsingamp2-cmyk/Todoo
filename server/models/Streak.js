const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    numberOfDays: {
      type: Number,
      required: true,
      min: 1,
    },

    completedDates: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Streak", streakSchema);