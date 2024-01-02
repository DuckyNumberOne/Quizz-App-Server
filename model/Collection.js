const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
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
    imgThumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
