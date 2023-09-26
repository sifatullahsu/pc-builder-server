const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const cluster = process.env.DB_CLUSTER;

const uri = `mongodb+srv://${user}:${pass}@${cluster}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const db = client.db("pc_builder");
const productCollection = db.collection("products");
const categoryCollection = db.collection("categories");
const reviewCollection = db.collection("reviews");

module.exports = {
  productCollection,
  categoryCollection,
  reviewCollection,
};
