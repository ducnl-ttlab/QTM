const { Category } = require("../db/models");
const CategoryService = require("../dbService/categoryService");

module.exports = class ApiNotification {
  // @route   GET api/category/get
  // @desc    get category
  // @access  Public
  static async getCategory(req, res) {
    try {
      let CacheCategory = await CategoryService.getCategories();
      res.status(200).json({ error: false, categories: CacheCategory });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }

  static async getName(req, res) {
    try {
      let CacheCategoryName = await CategoryService.getCategoriesName();

      res.status(200).json({ error: false, categories: CacheCategoryName });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
};
