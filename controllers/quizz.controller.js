const QuizzSchema = require("../model/Quizz");
const UserSchema = require("../model/User");
const CollectionSchema = require("../model/Collection");

const { checkExistsById } = require("../utils/checkExistsById");
const QuizzsController = {
  getQuizzs: async (req, res) => {
    try {
      const quizz = await QuizzSchema.find().populate("idCollection", "title");
      res.json(quizz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuizzsById: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (quizzExists) {
        const quizz = await QuizzSchema.findOne({ _id: id });
        const user = await UserSchema.findOne({ _id: quizz.idUser });
        const collection = await CollectionSchema.findOne({
          _id: quizz.idCollection,
        });
        const quizzWithUserInfo = {
          ...quizz.toObject(),
          user: user,
          collection: collection,
        };
        res.status(200).json(quizzWithUserInfo);
      } else {
        return res.status(404).json({ error: "Quizz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (quizzExists) {
        const quizz = await QuizzSchema.findOne(
          { _id: id },
          { "question.anwsers.isCorrect": 0 }
        );
        const question = quizz.question;
        if (!question) {
          return res.status(404).json({ error: "Question not found" });
        }
        res.status(200).json(question);
      } else {
        return res.status(404).json({ error: "Question not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAnwsersIsTrue: async (req, res) => {
    try {
      const { id } = req.params;
      const { idsArrayAnswer, idQuestion } = req.body;

      if (idsArrayAnswer.length > 3) {
        return res.status(400).json({ error: "Maximum 3 IDs allowed" });
      }
      const quizz = await QuizzSchema.findOne({ _id: id });

      if (!quizz) {
        return res.status(404).json({ error: "Quizz not found" });
      }

      const question = quizz.question.find(
        (question) => question._id.toString() === idQuestion
      );

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      const correctAnswers = question.anwsers.filter(
        (answer) => answer.isCorrect
      );

      const isAllCorrect =
        correctAnswers.length === idsArrayAnswer.length &&
        idsArrayAnswer.every((id) =>
          correctAnswers.some((answer) => answer._id.toString() === id)
        );

      res.status(200).json({ isAllCorrect });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getQuizzsByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userExists = await checkExistsById(UserSchema, id);
      if (userExists) {
        const quizz = await QuizzSchema.find({ idUser: id }).populate(
          "idCollection",
          "title"
        );
        res.status(200).json(quizz);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createQuizz: async (req, res) => {
    try {
      req.body;
      const existingQuizz = await QuizzSchema.findOne({
        title: req.body.title,
      });
      if (existingQuizz) {
        return res.status(403).json("Quizz already exists");
      } else {
        const quizz = new QuizzSchema({
          idUser: req.body.idUser,
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

  addQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (!quizzExists) {
        return res.status(404).json({ error: "Quizz not found" });
      }
      const quizz = await QuizzSchema.findById(id);
      quizz.question.push(body);
      const updatedQuizz = await quizz.save();
      res.json(updatedQuizz);
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
