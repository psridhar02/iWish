const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getWishlist, addItem, deleteItem } = require('../controllers/wishlistController');

router.get('/', auth, getWishlist);
router.post('/', auth, addItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
