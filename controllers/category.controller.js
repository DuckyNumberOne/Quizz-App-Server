const CategorySchema = require("../model/Category");
const { checkExistsById } = require("../utils/checkExistsById");
const categorysController = {
  getCategorys: async (req, res) => {
    try {
      const category = await CategorySchema.find();
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategorysById: async (req, res) => {
    try {
      const { id } = req.params;
      const CategoryExists = await checkExistsById(CategorySchema, id);
      if (CategoryExists) {
        const category = await CategorySchema.findOne({ _id: id });
        res.status(200).json(category);
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const existingCategory = await CategorySchema.findOne({
        title: req.body.title,
      });
      if (existingCategory) {
        return res.status(403).json("Category already exists");
      } else {
        const category = new CategorySchema({
          title: req.body.title,
          description: req.body.description,
        });
        const savedCategory = await category.save();
        res.json(savedCategory);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const CategoryExists = await checkExistsById(CategorySchema, id);
      if (!CategoryExists) {
        return res.status(404).json({ error: "Category not found" });
      }
      const updatedCategory = await CategorySchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...body,
          },
        },
        { new: true }
      ).exec();

      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const CategoryExists = await checkExistsById(CategorySchema, id);

      if (!CategoryExists) {
        return res.status(404).json({ error: "Category not found" });
      }
      const deleteCategory = await CategorySchema.deleteOne({
        _id: req.params.id,
      });
      res.json(deleteCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = categorysController;
