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

  getQuizzResultByIdQuizz: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzResultSchema, id);

      if (quizzExists) {
        const quizzResults = await QuizzResultSchema.find({ idQuizz: id });

        quizzResults.sort((a, b) => {
          if (a.totalPoints !== b.totalPoints) {
            return b.totalPoints - a.totalPoints;
          } else {
            return a.completionTime - b.completionTime;
          }
        });

        const quizzCheck = await Quizz.findOne({
          _id: quizzResults[0].idQuizz,
        });
        res.status(200).json(quizzCheck);
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
        let date = req.query.date ? new Date(req.query.date) : new Date();
        if (req.query.backward === "true") {
          date.setDate(date.getDate() - 1);
        }
        const quizzResultS = await QuizzResultSchema.find({
          idUser: id,
        }).populate("idQuizz", "title urlThumbnail question");
        res.status(200).json(quizzResultS);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // getQuizzResultByIdQuizz: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const quizzExists = await checkExistsById(QuizzSchema, id);
  //     if (quizzExists) {
  //       const quizzResultS = await QuizzResultSchema.find({ idQuizz: id });
  //       res.status(200).json(quizzResultS);
  //     } else {
  //       return res.status(404).json({ error: "Quizz not found" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  getQuizzResultByIdQuizz: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzExists = await checkExistsById(QuizzSchema, id);
      if (quizzExists) {
        const quizzResultS = await QuizzResultSchema.find({
          idQuizz: id,
        }).populate("idUser", "fullName urlAvatar");
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
        return res.status(403).json("User or Quizz does not exist");
      }

      const existingQuizzResult = await QuizzResultSchema.findOne({
        idUser: req.body.idUser,
        idQuizz: req.body.idQuizz,
      });

      if (existingQuizzResult) {
        existingQuizzResult.rightAnswer = req.body.rightAnswer;
        existingQuizzResult.completionTime = req.body.completionTime;
        existingQuizzResult.totalPoints = req.body.totalPoints;
        existingQuizzResult.questions = req.body.questions;

        const updatedQuizzResult = await existingQuizzResult.save();
        console.log("Updated QuizzResult:", updatedQuizzResult);
        res.json(updatedQuizzResult);
      } else {
        const newQuizzResult = new QuizzResultSchema({
          idUser: req.body.idUser,
          idQuizz: req.body.idQuizz,
          rightAnswer: req.body.rightAnswer,
          completionTime: req.body.completionTime,
          totalPoints: req.body.totalPoints,
          questions: req.body.questions,
        });

        const savedQuizzResult = await newQuizzResult.save();
        console.log("Saved QuizzResult:", savedQuizzResult);
        res.json(savedQuizzResult);
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

  deleteAllQuizzResults: async (req, res) => {
    try {
      await QuizzResultSchema.deleteMany({});
      res.json({ message: "All Quizz Results deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  calculateQuestionPercentages: async (req, res) => {
    try {
      const { id } = req.params;
      const quizzResults = await QuizzResultSchema.find({ idQuizz: id });
      const quizz = await QuizzSchema.findById(id);
      if (!quizz) {
        return res.status(404).json({ error: "QuizzResult not found" });
      }
      const totalPlayers = quizzResults.length;

      const countRightAnswers = new Array(quizz.question.length).fill(0);
      quizzResults.forEach((result) => {
        result.questions.forEach((question, index) => {
          if (question.rightAnswer) {
            countRightAnswers[index]++;
          }
        });
      });

      const questionPercentages = countRightAnswers.map((count) =>
        parseInt((count / totalPlayers) * 100)
      );

      const wrongAnswerData = countRightAnswers.map((count) =>
        parseInt(((totalPlayers - count) / totalPlayers) * 100)
      );

      const response = [
        { name: "Right answer", data: questionPercentages },
        { name: "Wrong answer", data: wrongAnswerData },
      ];

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = QuizzResultSchemaController;
