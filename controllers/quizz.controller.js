const QuizzSchema = require("../model/Quizz");
const { checkExistsById } = require("../utils/checkExistsById");
const QuizzsController = {
  getQuizzs: async (req, res) => {
    try {
      const quizz = await QuizzSchema.find();
      res.json(Quizz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuizzsById: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (quizzExists) {
        const Quizz = await QuizzSchema.findOne({ _id: id });
        res.status(200).json(Quizz);
      } else {
        return res.status(404).json({ error: "Quizz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createQuizz: async (req, res) => {
    try {
      const existingQuizz = await QuizzSchema.findOne({
        title: req.body.title,
      });
      if (existingQuizz) {
        return res.status(403).json("Quizz already exists");
      } else {
        const quizz = new QuizzSchema({
          urlThumbnail: req.body.urlThumbnail,
          title: req.body.title,
          description: req.body.description,
          idCollection: req.body.idCollection,
          visibility: req.body.visibility,
          keyword: req.body.keyword,
          question: req.body.question,
        });
        const savedQuizz = await quizz.save();
        res.json(savedQuizz);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateQuizz: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (!quizzExists) {
        return res.status(404).json({ error: "Quizz not found" });
      }
      const updatedQuizz = await QuizzSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...body,
          },
        },
        { new: true }
      ).exec();

      res.json(updatedQuizz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteQuizz: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzSchema, id);

      if (!quizzExists) {
        return res.status(404).json({ error: "Quizz not found" });
      }
      const deleteQuizz = await QuizzSchema.deleteOne({
        _id: req.params.id,
      });
      res.json(deleteQuizz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = QuizzsController;
