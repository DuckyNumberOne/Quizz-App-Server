const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
    typeAccount: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    }, //Bí Danh
    dateBirday: {
      type: String,
      minlength: 6,
      maxlength: 50,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 11,
    },
    country: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    urlAvatar: {
      type: String,
      minlength: 6,
      maxlength: 250,
    }, //Đường dẫn ảnh
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    }, // Địa chỉ Email
    password: {
      type: String,
      required: true,
      minlength: 6,
    }, // Mật khẩu
    admin: {
      type: Boolean,
      default: false,
    }, // Phân biệt Role Admin và Member
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
