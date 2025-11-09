import React, { useState } from "react";
import API from "../api";
import {
  setToken,
  setUsername,
  removeToken,
  removeUsername,
} from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { show } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // clear any stale values before attempting login
      removeToken();
      removeUsername();

      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      setUsername(res.data.username);
      show(`Welcome back, ${res.data.username}!`);
      nav("/");
    } catch (err) {
      console.error("Login error", err);
      const message =
        err?.response?.data?.msg || err.message || "Invalid credentials";
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
          <button className="w-full btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
