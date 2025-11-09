// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p, onAdd }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col hover:shadow-lg transition">
      <div className="h-48 flex items-center justify-center mb-4">
        <img src={p.image} alt={p.title} className="max-h-full object-contain" />
      </div>
      <h3 className="font-semibold text-md mb-1 line-clamp-2">{p.title}</h3>
      <p className="text-lg font-bold text-gray-800">${p.price}</p>
      <div className="mt-3 flex items-center justify-between">
        <Link to={`/product/${p.id}`} className="text-sm text-gray-600 underline">Details</Link>
        <button onClick={() => onAdd(p)} className="btn-primary">iWish</button>
      </div>
    </div>
  );
}
