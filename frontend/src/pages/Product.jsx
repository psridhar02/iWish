// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FakeStoreAPI from "../api"; // Renamed API to FakeStoreAPI for clarity
// import axios from 'axios'; // No longer needed
import { BackendAPI } from "../api"; // Import BackendAPI
import { authHeaders, getToken } from "../utils/auth";
import { useToast } from "../components/Toast";

export default function Product() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { show } = useToast();

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      // Use FakeStoreAPI for fetching product data
      const r = await FakeStoreAPI.get(`/products/${id}`);
      setProd(r.data);
    } catch (err) {
      console.error("Product fetch error", err);
      setError(
        err?.response?.data?.msg || err.message || "Error loading product"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const save = async () => {
    if (!getToken()) return show("Login to save", "warning");

    try {
      // Use BackendAPI for the POST request with relative path
      await BackendAPI.post(
        "/api/wishlist",
        {
          productId: prod.id,
          title: prod.title,
          price: prod.price,
          image: prod.image,
          category: prod.category,
        },
        { headers: authHeaders() }
      );

      // 3. REPLACE alert('Saved!') with show(...)
      show("Saved to wishlist!");

      const count = Number(localStorage.getItem("wishlist_count") || 0) + 1;
      localStorage.setItem("wishlist_count", String(count));
    } catch (err) {
      console.error(err);
      // 4. REPLACE alert('Error') with show(..., 'error')
      show("Error saving item", "error");
    }
  };

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading product…</div>;

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-100 p-4 rounded">
          <p className="text-red-700 mb-3">Error: {error}</p>
          <button
            className="bg-iwish-500 text-white px-3 py-1 rounded"
            onClick={fetchProduct}
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!prod)
    return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="md:flex gap-8 container mx-auto px-4 py-8">
      <img
        src={prod.image}
        className="w-full md:w-1/3 h-96 object-contain"
        alt={prod.title}
      />
      <div className="md:flex-1">
        <h2 className="text-2xl font-bold">{prod.title}</h2>
        <p className="mt-4 text-lg">${prod.price}</p>
        <p className="mt-4">{prod.description}</p>
        <button
          onClick={save}
          className="mt-6 bg-iwish-500 text-white px-4 py-2 rounded"
        >
          Save to Wishlist
        </button>
      </div>
    </div>
  );
}
