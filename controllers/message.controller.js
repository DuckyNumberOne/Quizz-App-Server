const Message = require("../model/Message");

exports.sendMessage = async (req, res) => {
  const { content, sender } = req.body;
  try {
    const newMessage = new Message({ content, sender });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error saving message" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving messages" });
  }
};
