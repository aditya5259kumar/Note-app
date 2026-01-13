const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
