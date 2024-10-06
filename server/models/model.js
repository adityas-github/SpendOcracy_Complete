const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Categories Schema
const categoriesSchema = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#FCBE44" },
});

// Transaction Schema
const transactionSchema = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

const Categories = mongoose.model("Categories", categoriesSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = {
  Categories,
  Transaction,
};
