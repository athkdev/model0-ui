"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleFocus() {
    setIsFormFocused(true);
  }

  function handleBlur() {
    setIsFormFocused(false);
  }

  const handleSignUp = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);

      const registerResponse = await axios.post("/v1/auth/user/signup", {
        email: email,
        username: email,
        password: password,
        role: "user",
      });

      if (registerResponse.status === 201 && registerResponse.data.token) {
        const loginResponse = await axios.post("/v1/auth/user/login", {
          email: email,
          password: password,
        });

        if (loginResponse.data.authenticated === "true") {
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

          router.push("/dashboard");
        } else {
          setError(
            "Registration successful but unable to log in automatically",
          );
        }
      } else {
        setError(registerResponse.data.error || "Registration failed");
      }
    } catch (err: any) {
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
      <div className="flex flex-col md:flex-row h-screen w-full">
        <div className="md:w-1/2 bg-neutral-800 relative h-64 md:h-full">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-600">
            <div className="text-center p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Join Us Today
              </h1>
              <p className="text-emerald-100 max-w-xs mx-auto">
                Create an account to get started and access all our features.
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
