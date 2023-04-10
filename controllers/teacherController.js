require("./../models/teacherModel");
const mongoose = require("mongoose");
const teacherSchema = mongoose.model("teachers");

const bcrypt = require("bcrypt");
const saltRounds = 5;
exports.GetAllTeachers = function (request, response, next) {
  teacherSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

/*exports.Getteacher = function (request, response) {
  response.status(200).json({ message: " Get teacher." });
};*/
exports.AddNewTeacher = function (request, response, next) {
  bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
    let object = new teacherSchema({
      _id: request.body.id,
      Fullname: request.body.Fullname,
      password: hash,
      Email: request.body.Email,
      Image: request.body.Image,
    });
    object
      .save()
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
  });
};

exports.UpdateteacheruserData = function (request, response, next) {
  if (request.body.id != request.decodedtoken.id)
    throw new Error("Error you cant update data");
  teacherSchema
    .updateOne(
      { _id: ObjectId(request.body.id) },
      {
        $set: {
          Fullname: request.body.Fullname,
          password: request.body.password,
          Email: request.body.Email,
          Image: request.body.Image,
        },
      }
    )
    .then((data) => {
      response.status(200).json({ data: "Updated" });
    })
    .catch((error) => next(error));
};
exports.Deletespecifiedteacher = function (request, response, next) {
  teacherSchema
    .deleteOne({ _id: ObjectId(request.body.id) })
    .then((data) => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => next(error));
};
