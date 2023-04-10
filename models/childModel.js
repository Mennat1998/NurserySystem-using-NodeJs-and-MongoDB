const mongoose = require("mongoose");
const { AutoIncrementID } = require("@typegoose/auto-increment");
//1)generate schema
//child Data: _id(Number), fullName, age , level (PreKG,KG1,KG2), address
//(city,street and building)
const childSchema = new mongoose.Schema({
  _id: Number,
  FullName: { type: String, require: true },
  Age: Number,
  Level: { type: String, enum: ["PreKG", "KG1", "KG2"] },
  address: {
    city: String,
    street: String,
    building: String,
  },
});
childSchema.plugin(AutoIncrementID, {});

//2)Mapping

mongoose.model("children", childSchema);
