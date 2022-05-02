const { Category } = require("../db/models");
const CategoryService = require("../dbService/categoryService");
const { setOrGetCache, removeCacheWithPrefix } = require("../utils/feature");

module.exports = class ApiNotification {
  // @route   GET api/category/get
  // @desc    get category
  // @access  Public
  static async getCategory(req, res) {
    try {
      let CacheCategory = await setOrGetCache("category", async () => {
        return await CategoryService.getCategories();
      });
      await removeCacheWithPrefix("categor");
      res.status(200).json({ error: false, categories: CacheCategory });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }

  static async getName(req, res) {
    try {
      let CacheCategoryName = await setOrGetCache("categoryName", async () => {
        return await CategoryService.getCategoriesName();
      });

      res.status(200).json({ error: false, categories: CacheCategoryName });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
};
