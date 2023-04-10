//require("./../models/childModel");
//require("./../models/classModel");
require("./../models/teacherModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const teacherSchema = mongoose.model("teachers");
const bcrypt = require("bcrypt");

exports.login = function (request, response, next) {
  // admin with static username and password
  //username:"Mennat" , // password:"12345"
  if (request.body.username == "Mennat" && request.body.password == "12345") {
    const token = jwt.sign(
      { id: 1, role: "admin", username: "Mennat" },
      "nurserysystem",
      { expiresIn: "1h" }
    );
    console.log(token);
    response.status(200).json({ data: "ok", token });
  } else {
    teacherSchema
      .findOne({ Email: request.body.Email })
      .then((user) => {
        bcrypt.compare(
          request.body.password,
          user.password,
          function (err, res) {
            if (res == true) {
              const token = jwt.sign(
                { id: user._id, role: "teacher" },
                "nurserysystem",
                { expiresIn: "1h" }
              );
              response.status(200).json({ data: "ok", token });
            } else {
              next(err);
            }
          }
        );
      })
      .catch((error) => next(error));
  }
};
