const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const student = require("./routes/student");
const teacher = require("./routes/teacher");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || port, () => {
      console.log(`Server is running ${port}`);
    });
  })
  .catch((err) => console.log("error while connecting to db", err));
app.use("/student", student);
app.use("/teacher", teacher);
