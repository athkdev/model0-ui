"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headerFont } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  function handleMouseMove(event) {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }

  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(68, 50, 168, 0.1), transparent 80%)`,
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former ML researcher at DeepMind with a passion for making AI accessible to everyone.",
      image: "/team/alex.jpg", // Replace with actual image path
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "10+ years building scalable ML infrastructure at leading tech companies.",
      image: "/team/sarah.jpg", // Replace with actual image path
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Product leader focused on creating intuitive interfaces for complex technologies.",
      image: "/team/michael.jpg", // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar with floating elements */}
      <nav className="sticky top-0 z-50 px-4 py-4 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Brand - Floating */}
          <div className="flex items-center space-x-2 z-20">
            <div className="w-8 h-8 rounded-md bg-gray-900 flex items-center justify-center text-white font-bold">
              M0
            </div>
            <span className="text-xl font-bold text-gray-900">model-0</span>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/70 px-6 py-2 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-8">
              <Link
                href="/product"
                className="text-gray-600 hover:text-gray-900"
              >
                Product
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Auth Buttons - Floating */}
          <div className="flex items-center space-x-4 z-20">
            <Link href="/login">
              <Button variant="link" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="cursor-pointer">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow relative overflow-hidden" ref={containerRef}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={gradientStyle}
        ></div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1
              className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${headerFont?.className}`}
            >
              Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future where machine learning is accessible to
              everyone, not just AI experts and large corporations.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div className="order-2 md:order-1">
              <h2
                className={`text-3xl font-bold text-gray-900 mb-6 ${headerFont?.className}`}
              >
                Our Story
              </h2>
              <div className="space-y-4 text-gray-500">
                <p>
                  Founded in 2023,{" "}
                  <span className="text-gray-800">model-0</span> emerged from a
                  simple observation: deploying machine learning models was
                  unnecessarily complex. We noticed the disconnect between rapid
                  AI advancements and the difficulty of implementing them, set
                  out to create a solution.
                </p>
                <p>
                  What began as a small project to simplify our own ML workflows
                  quickly evolved when we realized how many others faced the
                  same challenges. Today, we're helping teams of all sizes
                  harness the power of machine learning without the traditional
                  barriers of cost and technical expertise.
                </p>
                <p>
                  Our platform has grown, but our mission remains the same:{" "}
                  <span className="text-gray-800">
                    powerful technologies should be accessible to all. AI
                    shouldn't only be accessible for those who established in
                    the field.
                  </span>
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-white p-1 rounded-lg shadow-md">
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-400">
                Company Image
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 max-w-3xl mx-auto">
              <h2
                className={`text-3xl font-bold text-gray-900 mb-4 ${headerFont?.className}`}
              >
                Join Our Journey
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to build the future of machine learning with us? We would
                be launching soon - join the waitlist! And no we will not
                bombard you with emails : ).
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Input placeholder="Email address" />
                <Button>Join our waitlist</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright and Social Links */}
          <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} model-0. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="https://github.com"
                className="text-gray-600 hover:text-gray-900"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-600 hover:text-gray-900"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
