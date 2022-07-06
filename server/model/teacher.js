const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      require: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const teacherModel = mongoose.model("teachers", teacherSchema);
module.exports = teacherModel;
