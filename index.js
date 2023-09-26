const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const CategoryRoute = require("./src/modules/categories/categories.route");
const ProductRoute = require("./src/modules/products/products.route");
const ReviewRoute = require("./src/modules/reviews/reviews.route");

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", ProductRoute);
app.use("/categories", CategoryRoute);
app.use("/reviews", ReviewRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// categories: _id, title
// products: _id, title, description, image, price, key_features, status, category
// reviews: _id, product, uid, rating
