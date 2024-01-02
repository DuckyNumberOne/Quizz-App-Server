const router = require("express").Router();
const user = require("./user.router");
const category = require("./category.router");
const posts = require("./posts.router");
const auth = require("./auth.router");
const collection = require("./collection.router");

// Router
router.use("/user", user);
router.use("/category", category);
router.use("/collection", collection);
router.use("/authen", auth);
router.use("/posts", posts);

module.exports = router;
