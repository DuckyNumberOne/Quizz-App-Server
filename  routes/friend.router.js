const router = require("express").Router();
const friendsController = require("../controllers/friend.controller");
const middlewareToken = require("../middleware/token/tokenMiddleware");

router.get("/getAllFriends", friendsController.getFriends);
router.get("/getFriendByIdUser/:id", friendsController.getFriendByIdUser);
router.post(
  "/addFriend",
  middlewareToken.verifyTokenMember,
  friendsController.addFriend
);
router.put(
  "/updateFriendStatus/:id",
  middlewareToken.verifyTokenMember,
  friendsController.updateFriendStatus
);
router.delete(
  "/removeFriend/:id",
  middlewareToken.verifyTokenMember,
  friendsController.removeFriend
);

module.exports = router;
