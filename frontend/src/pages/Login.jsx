import React, { useState } from "react";
import API from "../api";
import { setToken, setUsername } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast"; // Hook is correctly imported

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // 1. CALL THE HOOK HERE
  const { show } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      setUsername(res.data.username || res.data.email);
      // Optional: Add a success toast upon successful login
      show(`Welcome back, ${res.data.username || res.data.email}!`);
      nav("/");
    } catch (err) {
      console.error("Login error", err);
      const message =
        err?.response?.data?.msg || err.message || "Invalid credentials";
      // 2. REPLACE alert(message) with show(..., 'error')
      show(message, "error");
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border p-3 rounded mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border p-3 rounded mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-pink-600 text-white px-4 py-3 rounded hover:bg-pink-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
