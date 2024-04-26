const mongoose = require("mongoose");

const QuizzSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    urlThumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    description: {
      type: String,
      minlength: 16,
      maxlength: 500,
      required: true,
    },
    idCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    visibility: {
      type: String,
      required: true,
      default: "public",
    }, //2 option:"private and public"---default:"public" required
    keyword: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    play: {
      type: Number,
      default: 0,
      //   required: true,
    },
    share: {
      type: Number,
      default: 0,
      //   required: true,
    },
    question: [
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
            text: { type: String, minlength: 1, maxlength: 50, required: true }, //required
            isCorrect: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quizz", QuizzSchema);
