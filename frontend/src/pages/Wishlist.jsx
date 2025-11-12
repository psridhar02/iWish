// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
// import axios from "axios"; // No longer needed, can be removed

// Use the new BackendAPI instance
import { BackendAPI } from "../api";

// Update imports to include all necessary auth helpers
import { authHeaders, getToken, getUsername } from "../utils/auth";
import { useToast } from "../components/Toast";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const { show } = useToast();

  // Get the username
  const username = getUsername();

  useEffect(() => {
    const token = getToken();
    if (!token) return setItems([]);

    // Re-enabled logic using the new BackendAPI instance and correct relative path
    BackendAPI.get("/api/wishlist", { headers: authHeaders() })
      .then((r) => setItems(r.data))
      .catch(() => {
        setItems([]);
        show("Could not fetch wishlist items.", "error");
      });
  }, [show]);

  const remove = async (id) => {
    // Re-enabled the remove functionality
    try {
      // Use the BackendAPI instance with the correct relative path
      await BackendAPI.delete(`/api/wishlist/${id}`, {
        headers: authHeaders(),
      });
      setItems(items.filter((i) => i._id !== id));
      show("Item removed from wishlist.", "success");
    } catch (err) {
      console.error(err);
      show("Error removing item", "error");
    }
  };

  // Update the return structure to use the username
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {/* Dynamically show username or default title */}
        {username ? `${username}'s Wishlist` : "My Wishlist"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it._id} className="border p-4 rounded shadow-sm">
            <img
              src={it.image}
              alt={it.title}
              className="h-48 object-contain mb-3"
            />
            <h3 className="font-semibold">{it.title}</h3>
            <p className="font-bold">${it.price}</p>
            <button
              onClick={() => remove(it._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
