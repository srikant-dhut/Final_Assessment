const { Category } = require("../../models/categoryModel");
const { Product } = require("../../models/productModel");
const mongoose = require("mongoose");

class CustomerController {
  async getProducts(req, res) {
    try {
      const category = await Category.find({});
      const products = await Product.find({});
      res.render("customerDashboard", { products, category });
    } catch (error) {
      console.log(error);
    }
  }
  async getspecificProduct(req, res) {
    try {
      const id = req.params.id;

      const result = await Product.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);

      res.render("productDetails", { products: result[0] });
    } catch (error) {
      console.log(error);
    }
  }
  async searchProduct(req, res) {
    try {
      const category = await Category.find({});
      const name = req.query.name;
      const products = await Product.aggregate([
        { $match: { name: { $regex: name, $options: "i" } } },
      ]);
      res.render("customerDashboard", { products, category });
    } catch (error) {
      console.log(error);
    }
  }
  async filterProduct(req, res) {
    try {
      const category = await Category.find({});
      const id = req.query.category;

      let products = [];
      if (!id) {
        products = await Product.find({});
      }

      products = await Product.find({
        category: new mongoose.Types.ObjectId(id),
      });

      res.render("customerDashboard", { products, category });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CustomerController();
