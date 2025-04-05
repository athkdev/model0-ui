// app/login/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // You'll need to configure your environment variables in Next.js
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  function handleFocus() {
    setIsFormFocused(true);
  }

  function handleBlur() {
    setIsFormFocused(false);
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }

  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(4, 89, 42, 0.15), transparent 80%)`,
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_BASE + "auth/user/login", {
        email: email,
        password: password,
      });

      Cookies.set("AUTH_TOKEN", response.data.token);
      Cookies.set("USER_ID", response.data.user.id);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed", error?.response?.data);
      alert("Email or Password is incorrect.");
    }
  };

  return (
    <div
      className="text-black flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={gradientStyle}
      ></div>
      <div className="w-full max-w-md relative z-10">
        <div
          className={`bg-white shadow-md rounded-lg px-8 py-6 transition ${
            isFormFocused ? "scale-105" : "border-gray-300"
          }`}
        >
          <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="bg-white w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Enter your email"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-white w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-neutral-500"
                placeholder="Enter your password"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-neutral-600 focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-700 ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
