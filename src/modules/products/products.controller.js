const { ObjectId } = require("mongodb");
const catchAsync = require("../../utils/catchAsync");
const { productCollection } = require("../../database/collections");

const createProduct = catchAsync(async (req, res) => {
  const data = req.body;

  if (ObjectId.isValid(data?.category)) {
    data.category = new ObjectId(data.category);
  }

  const request = await productCollection.insertOne(data);
  res.send(request);
});

const getProducts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const skip = (page - 1) * size;

  const pipeline = [
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product",
        as: "reviews",
      },
    },
    {
      $addFields: {
        avg_rating: {
          $avg: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
        },
      },
    },
    {
      $project: {
        reviews: 0,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: size,
    },
  ];

  const result = await productCollection.aggregate(pipeline).toArray();
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product",
        as: "reviews",
      },
    },
    {
      $addFields: {
        avg_rating: {
          $avg: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
        },
      },
    },
    {
      $project: {
        reviews: 0,
      },
    },
  ];

  const result = await productCollection.aggregate(pipeline).next();
  res.send(result);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
};
