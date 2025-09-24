const express = require("express");
const categoryController = require("../controllers/admin/categoryController");
const adminController = require("../controllers/admin/adminController");
const productController = require("../controllers/admin/productController");
const productImageUpload = require("../helper/productImage");
const router = express.Router();

router.get("/", adminController.dashboard);

router.get("/categories", categoryController.listCategory);
router.get("/categories/createForm", categoryController.createForm);
router.post("/categories/create", categoryController.createCategory);
router.get("/categories/editpage/:id", categoryController.editPage);
router.post("/categories/edit/:id", categoryController.editCategory);
router.get("/categories/delete/:id", categoryController.deleteCategory);

router.get("/products", productController.listProducts);
router.get("/products/createForm", productController.createForm);
router.post(
  "/products/create",
  productImageUpload.array("image"),
  productController.addProduct
);
router.get("/products/editpage/:id", productController.editPage);
router.post(
  "/products/edit/:id",
  productImageUpload.array("image"),
  productController.editProduct
);
router.get("/products/delete/:id", productController.deleteProduct);

module.exports = router;
