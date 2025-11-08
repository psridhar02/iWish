const express = require('express');
const axios = require('axios');
const router = express.Router();

const base = process.env.FAKESTORE_BASE || 'https://fakestoreapi.com';

// get all products
router.get('/', async (req, res) => {
  try {
    const r = await axios.get(`${base}/products`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching products' });
  }
});

// get product by id
router.get('/:id', async (req, res) => {
  try {
    const r = await axios.get(`${base}/products/${req.params.id}`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching product' });
  }
});

module.exports = router;
