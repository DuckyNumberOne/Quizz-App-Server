const Friend = require("../model/Friend");
const User = require("../model/User");

const { checkExistsById } = require("../utils/checkExistsById");

const friendsController = {
  getFriends: async (req, res) => {
    try {
      const friends = await Friend.find();
      res.json(friends);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFriendByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userExists = await checkExistsById(User, id);
      if (userExists) {
        const friend = await Friend.find({ userId: id }).populate("friendId");
        res.status(200).json(friend);
      } else {
        return res.status(404).json({ error: "Friend not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.body;
      const existingFriend = await Friend.findOne({ userId, friendId });
      if (existingFriend) {
        return res.status(403).json("Friendship already exists");
      }

      const friend = new Friend({
        userId,
        friendId,
      });
      const savedFriend = await friend.save();
      res.status(200).json(savedFriend);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFriendStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const friendExists = await checkExistsById(Friend, id);
      if (!friendExists) {
        return res.status(404).json({ error: "Friend not found" });
      }

      const updatedFriend = await Friend.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      res.json(updatedFriend);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { id } = req.params;
      const friendExists = await checkExistsById(Friend, id);

      if (!friendExists) {
        return res.status(404).json({ error: "Friend not found" });
      }

      await Friend.findByIdAndDelete(id);
      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = friendsController;
