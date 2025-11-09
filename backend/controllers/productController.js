import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProducts:", error.message);
    res.status(500).json({ msg: "Error fetching products", error: error.message });
  }
};
