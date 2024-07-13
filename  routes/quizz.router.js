const router = require("express").Router();
const quizzController = require("../controllers/quizz.controller");
const middlewareToken = require("../middleware/token/tokenMiddleware");
const middlewareValidate = require("../middleware/validation/validationMiddleware");

router.get("/getAllQuizz", quizzController.getQuizzs);
router.get("/getItemQuizz/:id", quizzController.getQuizzsById);
router.get("/getQuestionById/:id", quizzController.getQuestionById);
router.post("/getAnwsersIsTrue/:id", quizzController.getAnwsersIsTrue);
router.get("/getItemQuizzByUser/:id", quizzController.getQuizzsByIdUser);
router.post(
  "/createQuizz",
  //   middlewareValidate(quizzchema),
  middlewareToken.verifyTokenMember,
  quizzController.createQuizz
);
router.put(
  "/updateQuizz/:id",
  // middlewareValidate(quizzchema),
  middlewareToken.verifyTokenMember,
  quizzController.updateQuizz
);

router.put(
  "/addQuestions/:id",
  // middlewareValidate(quizzchema),
  middlewareToken.verifyTokenMember,
  quizzController.addQuestion
);

router.delete(
  "/deleteQuizz/:id",
  middlewareToken.verifyTokenAdmin,
  quizzController.deleteQuizz
);

module.exports = router;
