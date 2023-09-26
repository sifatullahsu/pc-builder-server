const { Router } = require("express");
const { getCategoryWithProducts, getCategories, createCategory } = require("./categories.controller");

const CategoryRoute = Router();

CategoryRoute.post("/", createCategory);
CategoryRoute.get("/", getCategories);
CategoryRoute.get("/products/:id", getCategoryWithProducts);

module.exports = CategoryRoute;
