const { ObjectId } = require("mongodb");
const { categoryCollection } = require("../../database/collections");
const catchAsync = require("../../utils/catchAsync");

const createCategory = catchAsync(async (req, res) => {
  const data = req.body;

  const request = await categoryCollection.insertOne(data);
  res.send(request);
});

const getCategories = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const skip = (page - 1) * size;

  const query = {};

  const result = await categoryCollection.find(query).skip(skip).limit(size).toArray();
  res.send(result);
});

const getCategoryWithProducts = catchAsync(async (req, res) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        pipeline: [
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
        ],
        as: "products",
      },
    },
  ];

  const result = await categoryCollection.aggregate(pipeline).next();
  res.send(result);
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryWithProducts,
};
