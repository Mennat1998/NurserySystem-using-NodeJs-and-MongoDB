require("./../models/childModel");
const mongoose = require("mongoose");
const childSchema = mongoose.model("children");

exports.Getallchildren = function (request, response, next) {
  childSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.Getchild = function (request, response, next) {
  childSchema
    .findOne({ _id: request.body.id })
    .then((child) => {
      if (child == null) {
        throw new Error(" Child not Found");
      }
      response.status(200).json(child);
    })
    .catch((error) => {
      next(error);
    });
};
exports.Addnewchild = function (request, response, next) {
  let object = new childSchema({
   // _id: request.body.id,
    FullName: request.body.FullName,
    Age: request.body.Age,
    Level: request.body.Level,
    address: {
      city: request.body.address.city,
      street: request.body.address.street,
      building: request.body.address.building,
    },
  });
  object
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.UpdatechilduserData = function (request, response, next) {
  childSchema
    .updateOne(
      { _id: request.body.id },
      {
        $set: {
          FullName: request.body.FullName,
          Age: request.body.Age,
          Level: request.body.Level,
          address: {
            city: request.body.address.city,
            street: request.body.address.street,
            building: request.body.address.building,
          },
        },
      }
    )
    .then((data) => {
      response.status(200).json({ data: "Updated" });
    })
    .catch((error) => next(error));
};
exports.Deletespecifiedchild = function (request, response, next) {
  childSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => next(error));
};
