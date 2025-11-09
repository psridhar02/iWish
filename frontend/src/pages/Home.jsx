import React, { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import { authHeaders, getToken } from "../utils/auth";
import axios from "axios";
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
    API.get("/products")
      .then((res) => {
        const prods = res.data || [];
        setProducts(prods);

        // Extract unique categories
        const cats = Array.from(new Set(prods.map((p) => p.category || "Uncategorized")));
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

      const currentCount = parseInt(localStorage.getItem("wishlist_count") || "0", 10);
      localStorage.setItem("wishlist_count", currentCount + 1);

      show("Saved to wishlist!");
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
