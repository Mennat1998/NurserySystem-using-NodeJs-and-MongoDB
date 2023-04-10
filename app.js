const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const server = express();
const loginRoute = require("./routes/authenticationRoute");
const Authmiddleware = require("./Middlewares/authMw");
const teacherRoute = require("./routes/teacherRoute");
const childRoute = require("./routes/childRoute");
const classRoute = require("./routes/classRoute");

mongoose
  .connect("mongodb://127.0.0.1:27017/nursery")
  .then(() => {
    //console.log("Database Connected");
    server.listen(process.env.PORT || 8080, () => {
      console.log("Server is Listening");
      console.log("Database Connected");
    });
  })
  .catch((error) => {
    console.log("Database Problem" + error);
  });

server.use(morgan("common"));

//route

server.use(express.json());
server.use(loginRoute);
server.use(Authmiddleware);
server.use(childRoute);
server.use(teacherRoute);
server.use(classRoute);

server.use((req, res, next) => {
  console.log("second moddle");
  next();
});
//not found
server.use((request, response) => {
  response.status(404).json({ message: "Page Not Found" });
});
//error

server.use((error, request, response, next) => {
  response.status(505).json({ message: "Exception:" + error });
});
