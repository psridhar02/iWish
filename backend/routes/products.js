// backend/routes/products.js
const express = require('express');
const router = express.Router();

const base = process.env.FAKESTORE_BASE || 'https://fakestoreapi.com';
const TARGET_COUNT = 200; // change this if you want more

// helper: expand an array of products to desired count
function expandProducts(baseProducts, targetCount) {
  if (!Array.isArray(baseProducts) || baseProducts.length === 0) return [];

  const out = [];
  let idx = 1;
  while (out.length < targetCount) {
    for (const p of baseProducts) {
      if (out.length >= targetCount) break;
      // clone product and give it a unique id
      const copy = {
        ...p,
        id: idx,
        title: `${p.title} ${Math.floor(idx / baseProducts.length) > 0 ? `(v${Math.floor(idx / baseProducts.length)})` : ''}`.trim(),
        // optionally tweak category or price slightly to add variety
        price: Math.round((p.price + (idx % 5) * 1.5) * 100) / 100
      };
      out.push(copy);
      idx++;
    }
  }
  return out;
}

// GET /api/products
router.get('/', async (req, res) => {
  try {
    console.log('Fetching products from:', `${base}/products`);
    const r = await fetch(`${base}/products`);
    if (!r.ok) throw new Error(`fake store status ${r.status}`);
    const data = await r.json();
    const expanded = expandProducts(data, TARGET_COUNT);
    res.json(expanded);
  } catch (err) {
    console.error('Error fetching products (proxy):', err.message);
    res.status(500).json({ msg: 'Error fetching products', error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 1) return res.status(400).json({ msg: 'Invalid id' });

    // fetch base products to compute which clone maps to this id
    const r = await fetch(`${base}/products`);
    if (!r.ok) throw new Error(`fake store status ${r.status}`);
    const data = await r.json();
    const expanded = expandProducts(data, TARGET_COUNT);

    const product = expanded.find(p => Number(p.id) === id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error('Error fetching single product (proxy):', err.message);
    res.status(500).json({ msg: 'Error fetching product', error: err.message });
  }
});

module.exports = router;
