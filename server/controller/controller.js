const model = require("../models/model");

// POST request to create a category
async function create_Categories(req, res) {
  try {
    const { type, color } = req.body;

    // Create a new category instance
    const newCategory = new model.Categories({
      type: type || "Investment",
      color: color || "#FCBE44",
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    // Respond with the created category
    return res.json(savedCategory);
  } catch (err) {
    // Handle any errors that occur during save
    console.error("Error while creating category:", err); // Log the error
    return res.status(400).json({ message: "Error while creating category" });
  }
}

//get request
async function get_Categories(req, res) {
  try {
    let data = await model.Categories.find({});
    let filter = data.map((v) =>
      Object.assign({}, { type: v.type, color: v.color })
    );
    return res.json(filter);
  } catch (err) {
    return res.status(400).json({ message: "Error while fetching categories" });
  }
}

//post http://localhost:6000/api/transaction
async function create_Transaction(req, res) {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Post HTTP Data not provided" });

    let { name, type, amount } = req.body;
    const create = new model.Transaction({
      name,
      type,
      amount,
      date: new Date(),
    });

    await create.save();
    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error while creating transaction" });
  }
}

//get http://localhost:6000/api/transaction
async function get_Transaction(req, res) {
  try {
    let data = await model.Transaction.find({});
    return res.json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error while fetching transaction" });
  }
}

//delete transaction
async function delete_Transaction(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body not found" });
    }

    const result = await model.Transaction.deleteOne(req.body);

    if (result.deletedCount > 0) {
      return res.json("Record Deleted....!");
    } else {
      return res.status(404).json({ message: "No record found to delete" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while deleting transaction record" });
  }
}

async function get_Labels(req, res) {
  try {
    const result = await model.Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
    ]);
    let data = result.map((v) =>
      Object.assign(
        {},
        {
          _id: v._id,
          name: v.name,
          type: v.type,
          amount: v.amount,
          color: v.category_info.color,
        }
      )
    );

    res.json(data);
  } catch (error) {
    console.error("Lookup Collection Error:", error); // Debug log
    res.status(400).json("Lookup Collection Error");
  }
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
