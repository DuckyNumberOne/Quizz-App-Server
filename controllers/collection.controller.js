const CollectionSchema = require("../model/Collection");
const { checkExistsById } = require("../utils/checkExistsById");
const collectionsController = {
  getCollections: async (req, res) => {
    try {
      const collection = await CollectionSchema.find();
      res.json(collection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCollectionsById: async (req, res) => {
    try {
      const { id } = req.params;
      const collectionExists = await checkExistsById(CollectionSchema, id);
      if (collectionExists) {
        const collection = await CollectionSchema.findOne({ _id: id });
        res.status(200).json(collection);
      } else {
        return res.status(404).json({ error: "Collection not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCollection: async (req, res) => {
    try {
      const existingcollection = await CollectionSchema.findOne({
        title: req.body.title,
      });
      if (existingcollection) {
        return res.status(403).json("Collection already exists");
      } else {
        const collection = new CollectionSchema({
          title: req.body.title,
          description: req.body.description,
          imgThumbnail: req.body.imgThumbnail,
        });
        const savedCollection = await collection.save();
        res.json(savedCollection);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCollection: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const collectionExists = await checkExistsById(CollectionSchema, id);
      if (!collectionExists) {
        return res.status(404).json({ error: "Collection not found" });
      }
      const updatedcollection = await CollectionSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...body,
          },
        },
        { new: true }
      ).exec();

      res.json(updatedcollection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCollection: async (req, res) => {
    try {
      const { id } = req.params;
      const collectionExists = await checkExistsById(CollectionSchema, id);

      if (!collectionExists) {
        return res.status(404).json({ error: "Collection not found" });
      }
      const deleteCollection = await CollectionSchema.deleteOne({
        _id: req.params.id,
      });
      res.json(deleteCollection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = collectionsController;
