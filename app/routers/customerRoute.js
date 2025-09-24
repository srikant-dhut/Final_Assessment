const express = require("express");
const customerController = require("../controllers/customer/customerController");
const router = express.Router();

router.get("/", customerController.getProducts);
router.get("/specific/:id", customerController.getspecificProduct);

// Customer search and filter routes
router.get("/search", customerController.searchProduct);
router.get("/filter", customerController.filterProduct);

// Friendly product detail alias
router.get("/product/:id", customerController.getspecificProduct);


module.exports = router;
