const mongoose = require("mongoose");

const QuizzResultsSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idQuizz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizz",
      required: true,
    },
    rightAnswer: {
      type: Number,
      required: true,
    },
    completionTime: {
      type: String,
      default: "00:00",
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizzResults", QuizzResultsSchema);
