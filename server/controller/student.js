const student = require("../model/student");

exports.addStudent = async (req, res, next) => {
  try {
    const studentData = req.body;
    const Student = await student.create(studentData);
    console.log("Student Added", Student);
    res.json({ Student, status: true });
  } catch (err) {
    console.log(err);
    res.json({ err, status: false });
  }
};
exports.getStudents = async (req, res, next) => {
  try {
    const students = await student.find({ isActive: true });
    res.json({ students, status: true });
  } catch {
    res.json({ students: null, status: false });
  }
};
exports.getStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sinleStudent = await student.findById(id);

    res.json({ sinleStudent, status: true });
  } catch {
    res.json({ sinleStudent: null, status: false });
  }
};
exports.getBySubject = async (req, res) => {
  try {
    const subject = await student.aggregate([
      { $match: { Subject: req.params.subject } },
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "teachers",
          localField: "Subject",
          foreignField: "Subject",
          as: "matchedSubject",
        },
      },
    ]);
    if (subject.length < 1) {
      res.json({ matched: null, status: false });
      return;
    }
    res.json({ matched: subject, status: true });
  } catch {
    res.json({ matched: null, status: false });
  }
};
exports.getByClass = async (req, res) => {
  try {
    const Class = await student.aggregate([
      { $match: { class: req.body.class } },
    ]);
    res.json({ classes: Class, status: true });
  } catch {
    res.json({ classes: null, status: false });
  }
};
exports.updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const User = await student.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.json({ User, status: true });
  } catch (err) {
    console.log(err);
    res.json({ err, status: false });
  }
};
exports.deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteStudent = await student.findByIdAndDelete(id);
    res.json({ deleteStudent, status: true });
  } catch {
    res.json({ deleteStudent: null, status: false });
  }
};

exports.softDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findStudent = await student.findOne({ _id: id });
    if (findStudent) {
      await student.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            isActive: false,
          },
        }
      );
    }
    // console.log(findStudent);
    res.json({ findStudent, status: true });
  } catch (err) {
    console.log(err);
    res.json({ err, status: false });
  }
};
