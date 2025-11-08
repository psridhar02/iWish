import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import { authHeaders, getToken } from '../utils/auth';
import axios from 'axios';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=> {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSave = async (p) => {
    const token = getToken();
    if (!token) return alert('Please login to save items');
    try {
      await axios.post('http://localhost:5000/api/wishlist', {
        productId: p.id, title: p.title, price: p.price, image: p.image, category: p.category
      }, { headers: authHeaders() });
      alert('Saved to wishlist!');
    } catch (err) {
      console.error(err);
      alert('Error saving item');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trending Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => <ProductCard key={p.id} p={p} onAdd={handleSave} />)}
      </div>
    </div>
  );
}
