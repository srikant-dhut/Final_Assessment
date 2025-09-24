const { productvalidation, Product } = require("../../models/productModel");
const { Category } = require("../../models/categoryModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

class ProductController {
  async listProducts(req, res) {
    try {
      const data = await Product.find({});
      res.render("product", { data });
    } catch (error) {
      console.log(error);
    }
  }
  async createForm(req, res) {
    try {
      const category = await Category.find({});
      res.render("productAddForm", { category });
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(req, res) {
    try {
      const getdata = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      };
      const { error } = productvalidation.validate(getdata);
      if (error) {
        return res.status(404).json({ message: error.details[0].message });
      }
      const { name, description, category } = req.body;

      const product = new Product({
        name,
        description,
        category,
        slug: slugify(name),
      });
      if (req.files) {
        const imagePaths = req.files.map((file) => file.path);
        product.image = imagePaths;
      }

      const data = await product.save();
      req.flash("success_msg", "Update successfull");
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  }
  async editPage(req, res) {
    try {
      const category = await Category.find({});
      const id = req.params.id;
      const data = await Product.findById(id);
      if (!data) {
        res.status(404).json({ message: "data is not avaialble" });
      }
      res.render("productEditForm", { data, category });
    } catch (error) {
      console.log(error);
    }
  }
  async editProduct(req, res) {
    try {
      const id = req.params.id;
      const existingData = await Product.findById(id);
      if (!existingData) {
        return res.status(404).json({ message: "Product not found" });
      }
      const getData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      };
      const { error } = productvalidation.validate(getData);
      if (error) {
        return res.status(404).json({ message: error.details[0].message });
      }
      let updateImagePaths = existingData.image;
      if (req.files && req.files.length > 0) {
        existingData.image.map((img) => {
          const imageFullPath = path.join(__dirname, "../../../", img);
          fs.unlink(imageFullPath, (err) => {
            if (err) console.error("Failed to delete image", err);
          });
        });
        updateImagePaths = req.files.map((file) => file.path);
      }
      const { name, description, category } = req.body;
      await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          category,
          image: updateImagePaths,
        },
        { new: true }
      );
      req.flash("success_msg", "Update successfull");
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const existingData = await Product.findById(id);
      if (!existingData) {
        return res.status(404).json({ message: "product is not found" });
      }
      
      await Product.findByIdAndDelete(id);
      req.flash("delete_msg", "Delete successfull");
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductController();
