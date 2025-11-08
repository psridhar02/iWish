import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeaders } from '../utils/auth';

export default function Wishlist(){
  const [items, setItems] = useState([]);
  useEffect(()=> {
    axios.get('http://localhost:5000/api/wishlist', { headers: authHeaders() })
      .then(r => setItems(r.data)).catch(() => setItems([]));
  }, []);

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}`, { headers: authHeaders() });
      setItems(items.filter(i => i._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it => (
          <div key={it._id} className="border p-4 rounded shadow-sm">
            <img src={it.image} alt={it.title} className="h-48 object-contain mb-3" />
            <h3 className="font-semibold">{it.title}</h3>
            <p className="font-bold">${it.price}</p>
            <button onClick={() => remove(it._id)} className="mt-3 bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
