const express = require("express");
const router = express.Router();
const controller = require("./../controllers/classController");
//const { checkAdmin, checkteacher } = require("../Middlewares/authMw");
//const { checkAdmin,checkteacher } = require("./../Middlewares/authMw");

router
  .route("/class")

  .get(controller.Getallclasses)
  .post(controller.AddnewclassData)
  .put(controller.Updateclassuser)
  .delete(controller.Deletespecifiedclass);

router.get("/class/:id", controller.Getclass);

router.get("/classTeacher/id", controller.GetClassSupervisor);
router.get("/classchildern/id", controller.GetClassChildren);
module.exports = router;
