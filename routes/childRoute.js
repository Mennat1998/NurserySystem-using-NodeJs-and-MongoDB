const express = require("express");
const router = express.Router();
const controller = require("./../controllers/childController");
const { checkAdmin } = require("./../Middlewares/authMw");
const { checkTeacher } = require("./../Middlewares/authMw");
router
  .route("/child")
  .get(checkTeacher, controller.Getallchildren)
  .post(checkAdmin, controller.Addnewchild)
  .put(controller.UpdatechilduserData)
  .delete(controller.Deletespecifiedchild);

router.get("/child/:id", controller.Getchild);

module.exports = router;
