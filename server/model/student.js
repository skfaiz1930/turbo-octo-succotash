const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      require: true,
    },
    Class: {
      type: String,
      required: true,
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

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;
