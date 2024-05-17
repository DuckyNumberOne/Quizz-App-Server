const userSchema = require("../model/User");
const bcrypt = require("bcrypt");
const { checkExistsById } = require("../utils/checkExistsById");

const checkExistsUser = async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const existingUser = await userSchema.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(403).json("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const user = new userSchema({
        ...req.body,
        password: hashed,
      });

      const savedUser = await user.save();
      res.json(savedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await checkExistsById(userSchema, id);
    if (userExists) {
      const user = await userSchema.findOne({ _id: id });
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userSchema.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await checkExistsById(userSchema, id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await userSchema
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      )
      .exec();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await checkExistsById(userSchema, id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = await userSchema.findById(req.body.id);
    res.status(200).json("Delete successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  checkExistsUser,
  createUser,
  getAllUser,
  updateUser,
  getUserById,
  deleteUser,
};
