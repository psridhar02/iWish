import React, { useState } from "react";
import API from "../api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      setToken(res.data.token);
      nav("/");
    } catch (err) {
      console.error(err);
      alert("Error registering");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-pink-600 text-white px-4 py-2 rounded">
          Sign up
        </button>
      </form>
    </div>
  );
}
