const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isVarified: { type: Boolean, required: true },
  // otp: {
  //   value: { type: String, required: true },
  //   expired: { type: Date, required: true },
  // },
});
const Users = mongoose.model("users", UsersSchema);
module.exports = Users;
