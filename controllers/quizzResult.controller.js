const QuizzResultSchema = require("../model/QuizzResults");
const UserSchema = require("../model/User");
const QuizzSchema = require("../model/Quizz");

const { checkExistsById } = require("../utils/checkExistsById");

const QuizzResultSchemaController = {
  getQuizzResults: async (req, res) => {
    try {
      const quizzResultS = await QuizzResultSchema.find()
        .populate("idUser", "title")
        .lean();

      res.json(quizzResultS);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuizzResultById: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzResultSchema, id);
      if (quizzExists) {
        const quizzResultS = await QuizzResultSchema.findOne({ _id: id });
        res.status(200).json(quizzResultS);
      } else {
        return res.status(404).json({ error: "QuizzResult not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuizzResultByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userExists = await checkExistsById(UserSchema, id);
      if (userExists) {
        const quizzResultS = await QuizzResultSchema.find({ idUser: id });
        res.status(200).json(quizzResultS);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuizzResultByIdQuizz: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (quizzExists) {
        const quizzResultS = await QuizzResultSchema.find({ idQuizz: id });
        res.status(200).json(quizzResultS);
      } else {
        return res.status(404).json({ error: "Quizz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createQuizzResult: async (req, res) => {
    try {
      const userExists = await checkExistsById(UserSchema, req.body.idUser);
      const quizzExists = await checkExistsById(QuizzSchema, req.body.idQuizz);
      if (!userExists || !quizzExists) {
        return res.status(403).json("user or quizz already not exists");
      } else if (userExists && quizzExists) {
        const quizzResultS = new QuizzResultSchema({
          idUser: req.body.idUser,
          idQuizz: req.body.idQuizz,
          rightAnswer: req.body.rightAnswer,
          completionTime: req.body.completionTime,
          totalPoints: req.body.totalPoints,
        });
        const savedQuizzResultS = await quizzResultS.save();
        res.json(savedQuizzResultS);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateQuizzResult: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const existingQuizzResult = await checkExistsById(QuizzResultSchema, id);
      if (!existingQuizzResult) {
        return res.status(404).json({ error: "QuizzResult not found" });
      }
      const updatedQuizzResultS = await QuizzResultSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...body,
          },
        },
        { new: true }
      ).exec();

      res.json(updatedQuizzResultS);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteQuizzResult: async (req, res) => {
    try {
      const { id } = req.params;
      const existingQuizzResult = await checkExistsById(QuizzResultSchema, id);

      if (!existingQuizzResult) {
        return res.status(404).json({ error: "QuizzResult not found" });
      }
      const deleteQuizz = await QuizzResultSchema.deleteOne({
        _id: req.params.id,
      });
      res.json(deleteQuizz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = QuizzResultSchemaController;
