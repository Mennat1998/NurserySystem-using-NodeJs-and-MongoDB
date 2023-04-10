const mongoose = require("mongoose");

//1)generate schema
//Class Data:_id(Number), name, supervisor (teacher id number), children which is
//array of children ids

const classSchema = new mongoose.Schema({
  _id: Number,
  Name: String,
  Supervisor: { type: Number, ref: "teachers" },
  Children: { type: Array, ref: "children" },
});

//2)Mapping

mongoose.model("classes", classSchema);
