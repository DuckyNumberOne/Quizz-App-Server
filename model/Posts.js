const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 250,
      required: true,
    },
    content: {
      type: String,
      minlength: 50,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    urlImage: {
      type: String,
      minlength: 5,
      maxlength: 250,
      required: true,
    },
    view: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
