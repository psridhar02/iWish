const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  productId: { type: Number, required: true }, // from FakeStoreAPI
  title: String,
  price: Number,
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WishlistItem', WishlistItemSchema);
