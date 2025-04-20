"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    console.log(API_BASE);
    console.log(process.env.NEXT_PUBLIC_API_BASE);
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
      className="text-black min-h-screen w-full bg-gray-100 relative overflow-hidden"
      ref={containerRef}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={gradientStyle}
      ></div>

      <div className="flex flex-col md:flex-row h-screen w-full">
        <div className="md:w-1/2 bg-neutral-800 relative h-64 md:h-full">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-600">
            <div className="text-center p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-emerald-100 max-w-xs mx-auto">
                Sign in to access your account and continue your journey with
                us.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 bg-white flex items-center justify-center">
          <div className="w-full max-w-md px-8 py-12">
            <div
              className={`transition-transform duration-300 ${
                isFormFocused ? "scale-105" : ""
              }`}
            >
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
                  Take me to dashboard
                </button>
              </form>
              <p className="text-center mt-4">
                Don&apos;t have an account?
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
      </div>
    </div>
  );
}
