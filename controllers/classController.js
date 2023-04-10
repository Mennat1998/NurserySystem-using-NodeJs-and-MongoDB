require("./../models/classModel");
const mongoose = require("mongoose");
const classSchema = mongoose.model("classes");
const teacherSchema = mongoose.model("teachers");
const childSchema = mongoose.model("children");
exports.Getallclasses = function (request, response, next) {
  classSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.Getclass = function (request, response, next) {
  classSchema
    .findOne({ _id: request.body.id })
    .then((Myclass) => {
      if (Myclass == null) {
        throw new Error(" Class not Found");
      }
      response.status(200).json(Myclass);
    })
    .catch((error) => {
      next(error);
    });
};
exports.GetClassSupervisor = function (request, response, next) {
  classSchema
    .findOne({ _id: request.body.id })
    .then((Myclass) => {
      if (Myclass == null) {
        throw new Error(" Class not Found");
      }
      response.status(200).json(Myclass.Children);
    })
    .catch((error) => {
      next(error);
    });
};
exports.GetClassChildren = function (request, response, next) {
  classSchema
    .findOne({ _id: request.body.id })
    .then((Myclass) => {
      if (Myclass == null) {
        throw new Error(" Class not Found");
      }
      response.status(200).json(Myclass.Supervisor);
    })
    .catch((error) => {
      next(error);
    });
};
exports.AddnewclassData = function (request, response, next) {
  teacherSchema
    .findOne({ _id: request.body.Supervisor })
    .then((Supervisor) => {
      if (Supervisor == null) throw new Error("Supervisor not exists");
      childSchema.find({ _id: request.body.Children }).then((Children) => {
        if (Children == null) throw new Error("children not exists");

        let object = new classSchema({
          _id: request.body.id,
          Name: request.body.Name,
          Supervisor: request.body.Supervisor,
          Children: request.body.Children,
        });

        return object.save();
      });
    })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.Updateclassuser = function (request, response, next) {
  classSchema
    .updateOne(
      { _id: request.body.id },
      {
        $set: {
          Name: request.body.Name,
          Supervisor: request.body.Supervisor,
          Children: request.body.Children,
        },
      }
    )
    .then((data) => {
      response.status(200).json({ data: "Updated" });
    })
    .catch((error) => next(error));
};
exports.Deletespecifiedclass = function (request, response, next) {
  classSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => next(error));
};
