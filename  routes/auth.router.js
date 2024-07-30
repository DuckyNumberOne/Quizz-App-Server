const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const validate = require("../middleware/validation/validationMiddleware");
const { authSchema } = require("../validation/auth/authValidation.js");

router.post("/login", validate(authSchema), authController.loginUser);
router.post(
  "/refreshToken",
  middlewareToken.verifyTokenMember,
  authController.requestRefreshToken
);
router.post(
  "/logout",
  middlewareToken.verifyTokenMember,
  authController.logout
);

module.exports = router;
