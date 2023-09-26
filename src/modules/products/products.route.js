const { Router } = require("express");
const { createProduct, getProducts, getProduct } = require("./products.controller");

const ProductRoute = Router();

ProductRoute.post("/", createProduct);
ProductRoute.get("/", getProducts);
ProductRoute.get("/:id", getProduct);

module.exports = ProductRoute;
