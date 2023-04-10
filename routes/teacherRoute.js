const express = require("express");
const router = express.Router();
const controller = require("./../controllers/teacherController");
const { checkAdmin } = require("./../Middlewares/authMw");
const { checkTeacher } = require("./../Middlewares/authMw");
router
  .route("/teacher")
  .get(checkAdmin, controller.GetAllTeachers)
  .post(checkAdmin, controller.AddNewTeacher)
  .put(controller.UpdateteacheruserData)
  .delete(controller.Deletespecifiedteacher);

// router.get("/teacher/:id",controller.Getteacher)

module.exports = router;
