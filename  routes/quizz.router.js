const router = require("express").Router();
const quizzController = require("../controllers/quizz.controller");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const middlewareValidate = require("../middleware/validation/validationMiddleware");

router.get("/getAllQuizz", quizzController.getQuizzs);
router.get("/getItemQuizz/:id", quizzController.getQuizzsById);
router.post(
  "/createQuizz",
  //   middlewareValidate(quizzchema),
  middlewareToken.verifyTokenAdmin,
  quizzController.createQuizz
);
router.put(
  "/updateQuizz/:id",
  // middlewareValidate(quizzchema),
  middlewareToken.verifyTokenAdmin,
  quizzController.updateQuizz
);

router.delete(
  "/deleteQuizz/:id",
  middlewareToken.verifyTokenAdmin,
  quizzController.deleteQuizz
);

module.exports = router;
