const mongoose = require("mongoose");
const Joi = require("joi");

const productvalidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(1).max(50).required(),
  category: Joi.string().required(),
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productvalidation };
