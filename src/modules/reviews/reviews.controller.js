const { ObjectId } = require("mongodb");
const catchAsync = require("../../utils/catchAsync");
const { reviewCollection } = require("../../database/collections");

const createReview = catchAsync(async (req, res) => {
  const data = req.body;

  if (ObjectId.isValid(data?.product)) {
    data.product = new ObjectId(data.product);
  }

  const request = await reviewCollection.insertOne(data);
  res.send(request);
});

const getReviewsByProductId = catchAsync(async (req, res) => {
  const id = req.params.id;
  const query = { product: ObjectId(id) };

  const result = await reviewCollection.find(query).toArray();
  res.send(result);
});

module.exports = {
  createReview,
  getReviewsByProductId,
};
