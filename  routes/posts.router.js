const router = require("express").Router();
const postsController = require("../controllers/posts.controller.js");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const middlewareInitializ = require("../middleware/handlers/initializMiddleware.js");
const middlewareValidate = require("../middleware/validation/validationMiddleware");
const {
  categorySchema,
} = require("../validation/category/categoryValidation.js");

router.get("/getAllPosts", postsController.getPostss);
router.get("/getItemPosts/:id", postsController.getPostssById);
router.get(
  "/getItemPostsByCategoryId/:id",
  postsController.getPostssByCategoryId
);
router.post(
  "/createPosts",
  // middlewareValidate(categorySchema),
  middlewareToken.verifyTokenAdmin,
  middlewareInitializ.initializView,
  postsController.createPosts
);
router.put(
  "/updatePosts/:id",
  // middlewareValidate(categorySchema),
  middlewareToken.verifyTokenAdmin,
  postsController.updatePosts
);

router.delete(
  "/deletePosts/:id",
  middlewareToken.verifyTokenAdmin,
  postsController.deletePosts
);

module.exports = router;
