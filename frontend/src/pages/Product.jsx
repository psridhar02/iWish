import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import axios from "axios";
import { authHeaders, getToken } from "../utils/auth";

export default function Product() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  useEffect(() => {
    API.get(`/products/${id}`).then((r) => setProd(r.data));
  }, [id]);

  const save = async () => {
    if (!getToken()) return alert("Login to save");
    try {
      await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          productId: prod.id,
          title: prod.title,
          price: prod.price,
          image: prod.image,
          category: prod.category,
        },
        { headers: authHeaders() }
      );
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  if (!prod) return <div>Loading...</div>;
  return (
    <div className="md:flex gap-8">
      <img
        src={prod.image}
        className="w-full md:w-1/3 h-96 object-contain"
        alt={prod.title}
      />
      <div>
        <h2 className="text-2xl font-bold">{prod.title}</h2>
        <p className="mt-4 text-lg">${prod.price}</p>
        <p className="mt-4">{prod.description}</p>
        <button
          onClick={save}
          className="mt-6 bg-pink-600 text-white px-4 py-2 rounded"
        >
          Save to Wishlist
        </button>
      </div>
    </div>
  );
}
