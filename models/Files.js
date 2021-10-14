const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    originalname: { type: String, required: true },
  },
  { timestamps: true }
);

const Files = mongoose.model("files", FileSchema);
module.exports = Files;
