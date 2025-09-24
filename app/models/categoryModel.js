const mongoose = require("mongoose");
const Joi = require("joi");

const categoryvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
});

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = { Category, categoryvalidation };
