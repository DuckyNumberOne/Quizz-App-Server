const router = require("express").Router();
const messageController = require("../controllers/message.controller");

router.post("/send", messageController.sendMessage);
router.get("/all", messageController.getAllMessages);

module.exports = router;
