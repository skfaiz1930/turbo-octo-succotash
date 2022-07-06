const express = require("express");
const router = express.Router();
const studentController = require("../controller/student");

router.post("/addStudent", studentController.addStudent);
router.get("/getStudents", studentController.getStudents);
router.get("/getStudent/:id", studentController.getStudent);
router.get("/getBySubject/:subject", studentController.getBySubject);
router.post("/getByClass", studentController.getByClass);
router.put("/editStudent/:id", studentController.updateStudent);
router.put("/deleteStudent/:id", studentController.deleteStudent);
router.delete("/softDelete/:id", studentController.softDelete);

module.exports = router;
