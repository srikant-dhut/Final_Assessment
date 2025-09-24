const { categoryvalidation, Category } = require("../../models/categoryModel");
const slugify = require("slugify");

class CategoryController {
  async listCategory(req, res) {
    try {
      const categoryData = await Category.find({});
      res.render("category", { data: categoryData });

    } catch (error) {
      console.log(error);
    }
  }
  async createForm(req, res) {
    try {
      res.render("categoryAddForm");
    } catch (error) {
      console.log(error);
    }
  }
  async createCategory(req, res) {
    try {
      const getData = {
        name: req.body.name,
      };
      const { error } = categoryvalidation.validate(getData);
      if (error) {
        return res.status(404).json({ message: error.details[0].message });
      }
      const { name } = req.body;
      const existingData = await Category.findOne({ name });

      if (existingData && existingData.isDeleted === false) {
        return res.status(400).json({ message: "Category already exists" });
      }

      if (existingData && existingData.isDeleted === true) {
        console.log(existingData._id);
        await Category.findByIdAndUpdate(existingData._id, {
          isDeleted: false,
        });
        req.flash("success_msg", "Category add in our list");
        return res.redirect("/admin");
      }
      const categoryData = new Category({ name, slug: slugify(name) });
      const data = await categoryData.save();
      req.flash("success_msg", "Category add in our list");
      res.redirect("/admin");

    } catch (error) {
      console.log(error);
    }
  }
  async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      const existingData = await Category.findById(id);
      if (!existingData) {
        return res.status(404).json({ message: "Category is not found" });
      }
      await Category.findByIdAndUpdate(id, { isDeleted: true });
      req.flash("delete_msg", "Delete successfull");
      res.redirect("/admin/categories");


    } catch (error) {
      console.log(error);
    }
  }

  async editPage(req, res) {
    try {
      const id = req.params.id;
      const data = await Category.findById(id);
      if (!data) {
        res.status(404).json({ message: "data is not avaialble" });
      }
      res.render("categoryEditForm", { data });
    } catch (error) {
      console.log(error);
    }
  }
  async editCategory(req, res) {
    try {
      const id = req.params.id;
      const existingData = await Category.findById(id);
      if (!existingData) {
        return res.status(404).json({ message: "Catgeory not found" });
      }
      const getData = {
        name: req.body.name,
      };
      const { error } = categoryvalidation.validate(getData);
      if (error) {
        return res.status(404).json({ message: error.details[0].message });
      }
      const { name } = req.body;
      const updatedata = await Category.findByIdAndUpdate(id, { name });
      req.flash("success_msg", "Update successfull");
      res.redirect("/admin/categories");

    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new CategoryController();
