const mongoose = require("mongoose");

const middlewareInitializ = {
  initializView: async (req, res, next) => {
    try {
      req.body = { ...req.body, view: 0 };
      next();
    } catch (error) {
      console.error("Error initializing view:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  initializAvatar: async (req, res, next) => {
    try {
      req.body = {
        ...req.body,
        urlAvatar:
          "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
      };
      next();
    } catch (error) {
      console.error("Error initializing view:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = middlewareInitializ;
