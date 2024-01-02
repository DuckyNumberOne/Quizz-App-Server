const router = require("express").Router();
const categorysController = require("../controllers/category.controller.js");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const middlewareValidate = require("../middleware/validation/validationMiddleware");
const {
  categorySchema,
} = require("../validation/category/categoryValidation.js");

router.get("/getAllCategory", categorysController.getCategorys);
router.get("/getItemCategory/:id", categorysController.getCategorysById);
router.post(
  "/createCategory",
  middlewareValidate(categorySchema),
  middlewareToken.verifyTokenAdmin,
  categorysController.createCategory
);
router.put(
  "/updateCategory/:id",
  middlewareValidate(categorySchema),
  middlewareToken.verifyTokenAdmin,
  categorysController.updateCategory
);

router.delete(
  "/deleteCategory/:id",
  middlewareToken.verifyTokenAdmin,
  categorysController.deleteCategory
);

module.exports = router;
