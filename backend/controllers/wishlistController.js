const WishlistItem = require('../models/WishlistItem');

exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  const items = await WishlistItem.find({ userId }).sort({ createdAt: -1 });
  res.json(items);
};

exports.addItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, title, price, image, category } = req.body;
  const item = new WishlistItem({ userId, productId, title, price, image, category });
  await item.save();
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const item = await WishlistItem.findOneAndDelete({ _id: id, userId });
  if (!item) return res.status(404).json({ msg: 'Item not found' });
  res.json({ msg: 'Deleted' });
};
