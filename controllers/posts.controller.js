const PostsSchema = require("../model/Posts");
const { checkExistsById } = require("../utils/checkExistsById");
const postssController = {
  getPostss: async (req, res) => {
    try {
      const posts = await PostsSchema.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPostssById: async (req, res) => {
    try {
      const { id } = req.params;
      const PostsExists = await checkExistsById(PostsSchema, id);
      if (PostsExists) {
        const posts = await PostsSchema.findOne({ _id: id });
        res.status(200).json(posts);
      } else {
        return res.status(404).json({ error: "Posts not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPostssByCategoryId: async (req, res) => {
    try {
      const { id } = req.params;
      const CategoryExists = await checkExistsById(CategorySchema, id);
      if (CategoryExists) {
        const posts = await PostsSchema.findOne({ category: id });
        res.status(200).json(posts);
      } else {
        return res.status(404).json({ error: "Posts not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPosts: async (req, res) => {
    try {
      const existingPosts = await PostsSchema.findOne({
        title: req.body.title,
      });
      if (existingPosts) {
        return res.status(403).json("Posts already exists");
      } else {
        const posts = new PostsSchema({
          title: req.body.title,
          content: req.body.content,
          urlImage: req.body.urlImage,
          username: req.body.username,
          category: req.body.category,
          view: req.body.view,
        });
        const savedPosts = await posts.save();
        res.json(savedPosts);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePosts: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const PostsExists = await checkExistsById(PostsSchema, id);
      if (!PostsExists) {
        return res.status(404).json({ error: "Posts not found" });
      }
      const updatedPosts = await PostsSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...body,
          },
        },
        { new: true }
      ).exec();

      res.json(updatedPosts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePosts: async (req, res) => {
    try {
      const { id } = req.params;
      const PostsExists = await checkExistsById(PostsSchema, id);

      if (!PostsExists) {
        return res.status(404).json({ error: "Posts not found" });
      }
      const deleteProcduct = await PostsSchema.deleteOne({
        _id: req.params.id,
      });
      res.json(deleteProcduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = postssController;
