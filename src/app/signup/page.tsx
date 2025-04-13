// app/signup/page.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSignUp = async () => {
    // Reset any previous errors
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);

      // First, register the user
      const registerResponse = await axios.post(API_BASE + "auth/user/signup", {
        email: email,
        username: email,
        password: password,
        role: "user",
      });

      console.log(registerResponse);

      // If registration is successful, log in automatically
      if (registerResponse.status === 201 && registerResponse.data.token) {
        const loginResponse = await axios.post(API_BASE + "auth/user/login", {
          email: email,
          password: password,
        });

        // Store the token in localStorage or a state management store
        if (loginResponse.data.authenticated === "true") {
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

          // Redirect to the dashboard
          router.push("/dashboard");
        } else {
          // Handle unsuccessful login after registration
          setError(
            "Registration successful but unable to log in automatically"
          );
        }
      } else {
        // Handle unsuccessful registration
        setError(registerResponse.data.error || "Registration failed");
      }
    } catch (err: any) {
      // Handle errors
      console.error("Sign up error:", err);
      setError(err.response?.data?.error || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
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
      
      {/* Main Container - Split Layout (Full Page) */}
      <div className="flex flex-col md:flex-row h-screen w-full">
        
        {/* Left Side - Image */}
        <div className="md:w-1/2 bg-neutral-800 relative h-64 md:h-full">
          {/* Placeholder image - replace with your actual image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-600">
            {/* You can use Next's Image component for optimized images */}
            {/* <Image 
              src="/your-image-path.jpg" 
              alt="Signup image" 
              fill
              style={{ objectFit: "cover" }}
              priority 
            /> */}
            
            {/* Placeholder content until you add your image */}
            <div className="text-center p-6">
              <h1 className="text-3xl font-bold text-white mb-2">Join Us Today</h1>
              <p className="text-emerald-100 max-w-xs mx-auto">Create an account to get started and access all our features.</p>
            </div>
          </div>
        </div>
        
        {/* Right Side - Signup Form */}
        <div className="md:w-1/2 bg-white flex items-center justify-center">
          <div className="w-full max-w-md px-8 py-12">
            <div
              className={`transition-transform duration-300 ${
                isFormFocused ? "scale-105" : ""
              }`}
            >
              <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp();
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
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-300"
                    placeholder="Enter your email"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-4">
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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-neutral-500"
                    placeholder="Create a password"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-neutral-500"
                    placeholder="Confirm your password"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-neutral-600 focus:outline-none focus:shadow-outline"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <p className="text-center mt-4">
                Already have an account?
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-700 ml-1"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}