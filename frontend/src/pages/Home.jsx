// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import { authHeaders, getToken } from "../utils/auth";
import axios from "axios";
import Hero from "../components/Hero";
import { useToast } from "../components/Toast"; // Hook is correctly imported

export default function Home() {
  const [products, setProducts] = useState([]);

  // 1. CALL THE HOOK HERE
  const { show } = useToast();

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (p) => {
    const token = getToken();
    // 2. REPLACE alert("Please login to save items") with show(...)
    if (!token) return show("Please login to save items", "warning");

    try {
      await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          productId: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category,
        },
        { headers: authHeaders() }
      );

      // ADDED LOGIC: Update wishlist count in localStorage
      const currentCount = parseInt(
        localStorage.getItem("wishlist_count") || "0",
        10
      );
      localStorage.setItem("wishlist_count", currentCount + 1);

      // 3. REPLACE alert("Saved to wishlist!") with show(...)
      show("Saved to wishlist!");
    } catch (err) {
      console.error(err);
      // 4. REPLACE alert("Error saving item") with show(..., 'error')
      show("Error saving item", "error");
    }
  };

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Trending Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={handleSave} />
          ))}
        </div>
      </div>
    </div>
  );
}
