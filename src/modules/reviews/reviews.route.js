const { Router } = require("express");
const { createReview, getReviewsByProductId } = require("./reviews.controller");

const ReviewRoute = Router();

ReviewRoute.post("/", createReview);
ReviewRoute.get("/products/:id", getReviewsByProductId);

module.exports = ReviewRoute;
