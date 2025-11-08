import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p, onAdd }) {
  return (
    <div className="border rounded shadow-sm p-4 flex flex-col">
      <img src={p.image} alt={p.title} className="h-48 object-contain mb-4" />
      <div className="flex-1">
        <h3 className="font-semibold text-md mb-2">{p.title}</h3>
        <p className="text-lg font-bold">${p.price}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link to={`/product/${p.id}`} className="text-sm underline">Details</Link>
        <button onClick={() => onAdd(p)} className="bg-pink-600 text-white px-3 py-1 rounded">Save</button>
      </div>
    </div>
  );
}