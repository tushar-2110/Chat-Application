const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: string, require: true },
    email: { type: string, reuired: true },
    password: { type: string, required: true },
    pic: {
      type: string,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;