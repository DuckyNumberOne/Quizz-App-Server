const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    imgQuestion: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      default: 0,
    },
    point: {
      type: Number,
      default: 0,
    },
    anwsers: [
      {
        number: {
          type: Number,
          required: true,
          default: 0,
        }, //required
        text: { type: String, minlength: 5, maxlength: 50, required: true }, //required
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
