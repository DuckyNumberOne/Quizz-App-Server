const router = require("express").Router();
const user = require("./user.router");
const category = require("./category.router");
const posts = require("./posts.router");
const auth = require("./auth.router");
const collection = require("./collection.router");
const quizz = require("./quizz.router");
const quizzResult = require("./quizzResult.router");
const friend = require("./friend.router");

// Router
router.use("/user", user);
router.use("/category", category);
router.use("/collection", collection);
router.use("/authen", auth);
router.use("/quizz", quizz);
router.use("/posts", posts);
router.use("/quizzResult", quizzResult);
router.use("/friend", friend);

module.exports = router;
