const { Product } = require("../../models/productModel");
const { Category } = require("../../models/categoryModel");

class AdminController {
  async dashboard(req, res) {
    try {
      const categories = await Category.find({ isDeleted: false });
      const products = await Product.find({ isDeleted: false });
      res.render("adminDashboard", { categories, products });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AdminController();
