const router = require("express").Router();
const {
  checkExistsUser,
  createUser,
  getUserById,
  getAllUser,
  deleteUser,
  updateUser,
  findUserNameByFullName,
} = require("../controllers/user.controller");
const validate = require("../middleware/validation/validationMiddleware");
const middlewareController = require("../middleware/token/tokenMiddleware");
const middlewareInitializ = require("../middleware/handlers/initializMiddleware.js");
const {
  userSchema,
  userSchemaUpdate,
} = require("../validation/user/userValidation.js");

router.post(
  "/createUser",
  middlewareInitializ.initializAvatar,
  validate(userSchema),
  createUser
);
router.post("/checkExisEmail", checkExistsUser);
router.get("/getAllUser", middlewareController.verifyTokenMember, getAllUser);
router.get(
  "/getAllUserByFullName/:fullName",
  middlewareController.verifyTokenMember,
  findUserNameByFullName
);
router.get("/getUser/:id", middlewareController.verifyTokenMember, getUserById);
router.put(
  "/updateUser/:id",
  validate(userSchemaUpdate),
  middlewareController.verifyTokenMember,
  updateUser
);
router.delete(
  "/deleteUser/:id",
  middlewareController.verifyTokenAdmin,
  deleteUser
);

module.exports = router;
