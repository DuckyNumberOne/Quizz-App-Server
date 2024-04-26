const router = require("express").Router();
const quizzResultController = require("../controllers/quizzResult.controller");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const middlewareValidate = require("../middleware/validation/validationMiddleware");

// router.get("/getAllQuizz", quizzResultController.getQuizzResults);
router.get("/getItemQuizzResult/:id", quizzResultController.getQuizzResultById);
router.get(
  "/getItemQuizzResultByUser/:id",
  quizzResultController.getQuizzResultByIdUser
);
router.get(
  "/getItemQuizzResultByQuizz/:id",
  quizzResultController.getQuizzResultByIdQuizz
);

router.post(
  "/createQuizzResult",
  // middlewareValidate(quizzchema),
  middlewareToken.verifyTokenMember,
  quizzResultController.createQuizzResult
);
router.put(
  "/updateQuizzResult/:id",
  // middlewareValidate(quizzchema),
  middlewareToken.verifyTokenMember,
  quizzResultController.updateQuizzResult
);

router.delete(
  "/deleteQuizzResult/:id",
  middlewareToken.verifyTokenAdmin,
  quizzResultController.deleteQuizzResult
);

module.exports = router;
