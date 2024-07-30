const router = require("express").Router();
const collectionsController = require("../controllers/collection.controller.js");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const middlewareValidate = require("../middleware/validation/validationMiddleware");
const {
  collectionSchema,
} = require("../validation/collection/collectionValidation.js");

router.get(
  "/getAllCollection",
  middlewareToken.verifyTokenMember,
  collectionsController.getCollections
);
router.get("/getItemCollection/:id", collectionsController.getCollectionsById);
router.post(
  "/createCollection",
  middlewareValidate(collectionSchema),
  middlewareToken.verifyTokenAdmin,
  collectionsController.createCollection
);
router.put(
  "/updateCollection/:id",
  // middlewareValidate(collectionSchema),
  middlewareToken.verifyTokenAdmin,
  collectionsController.updateCollection
);

router.delete(
  "/deleteCollection/:id",
  middlewareToken.verifyTokenAdmin,
  collectionsController.deleteCollection
);

module.exports = router;
