const mongoose = require("mongoose");

//1)generate schema
//teacher Data: _id(objectID), fullname,password, email , image (which is string)
const teacherSchema = new mongoose.Schema({
  _id: Number,
 // _id:mongoose.Types.ObjectId,
  Fullname: { type: String, require: true },
  password: String,
  Email: String,
  Image: String,
});

//2)Mapping
mongoose.model("teachers", teacherSchema);
