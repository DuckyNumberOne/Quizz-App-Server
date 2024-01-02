const middlewareValidate = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      console.log(
        "🚀 ~ file: validationMiddleware.js:5 ~ return ~ req.body:",
        req.body
      );
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
module.exports = middlewareValidate;
