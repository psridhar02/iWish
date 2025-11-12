import React, { useEffect, useState } from "react";
// 1. Rename import API to FakeStoreAPI for clarity
import FakeStoreAPI from "../api";
import ProductCard from "../components/ProductCard";
import { authHeaders, getToken } from "../utils/auth";
// 2. Import the new BackendAPI
import { BackendAPI } from "../api";

// import axios from "axios"; // No longer needed, can be removed
import Hero from "../components/Hero";
import { useToast } from "../components/Toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("All");

  const { show } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL param for category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category") || "All";
    setActiveCat(cat);
  }, [location.search]);

  // Fetch products and categories
  useEffect(() => {
    // 3. Use the clearer FakeStoreAPI instance
    FakeStoreAPI.get("/products")
      .then((res) => {
        const prods = res.data || [];
        setProducts(prods);

        // Extract unique categories
        const cats = Array.from(
          new Set(prods.map((p) => p.category || "Uncategorized"))
        );
        const allCats = ["All", ...cats];
        setCategories(allCats);

        // Save categories in localStorage
        localStorage.setItem("iwish_categories", JSON.stringify(allCats));
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter products by active category
  const filteredProducts =
    activeCat === "All"
      ? products
      : products.filter((p) => (p.category || "Uncategorized") === activeCat);

  const handleSave = async (p) => {
    const token = getToken();
    if (!token) return show("Please login to save items", "warning");

    // Re-enabled logic using the new BackendAPI instance and correct relative path
    try {
      // Use the BackendAPI instance
      await BackendAPI.post(
        "/api/wishlist",
        { product: p },
        { headers: authHeaders() }
      );

      show("Saved to wishlist!");
      // const count = parseInt(localStorage.getItem("wishlist_count") || "0", 10); // Current logic needs adjustment for currentCount
      // localStorage.setItem("wishlist_count", currentCount + 1);
    } catch (err) {
      console.error(err);
      show("Error saving item", "error");
    }
  };

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Trending Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={handleSave} />
          ))}
        </div>
      </div>
    </div>
  );
}
