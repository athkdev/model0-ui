"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headerFont } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { CheckIcon } from "lucide-react";

export default function Pricing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [annualBilling, setAnnualBilling] = useState(true);

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

  // Plan features
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: annualBilling ? 29 : 39,
      features: [
        "Up to 3 ML models",
        "50K API calls / month",
        "Standard ML model templates",
        "Community support",
        "Basic analytics",
      ],
      popular: false,
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      description: "Ideal for growing teams and advanced projects",
      price: annualBilling ? 79 : 99,
      features: [
        "Up to 10 ML models",
        "500K API calls / month",
        "Advanced ML model templates",
        "Priority email support",
        "Advanced analytics",
        "Custom model training",
        "Team collaboration tools",
      ],
      popular: true,
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      description: "For organizations with complex ML needs",
      price: "Custom",
      features: [
        "Unlimited ML models",
        "Unlimited API calls",
        "Full model library access",
        "Dedicated support team",
        "Custom integrations",
        "On-premises deployment option",
        "Advanced security features",
        "SLA guarantees",
      ],
      popular: false,
      buttonVariant: "outline",
    },
  ];

  // Frequently asked questions
  const faqs = [
    {
      question: "How do I choose the right plan?",
      answer:
        "Consider your project size, expected API usage, and whether you need advanced features like custom model training. Our Starter plan is great for individuals, Pro for growing teams, and Enterprise for organizations with complex needs.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time and the new charges will be prorated. Downgrading is also possible at the end of your current billing cycle.",
    },
    {
      question: "What happens if I exceed my monthly API call limit?",
      answer:
        "If you exceed your limit, you won't be cut off. Additional API calls are charged at a per-call rate. We'll notify you when you reach 80% of your limit so you can decide whether to upgrade.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial on both our Starter and Pro plans with full access to all features. No credit card required to start your trial.",
    },
    {
      question:
        "Do you offer discounts for startups or educational institutions?",
      answer:
        "Yes, we offer special pricing for startups, non-profits, and educational institutions. Please contact our sales team for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for Enterprise plans.",
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
                href="/pricing"
                className="text-gray-600 hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
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
          <div className="text-center mb-16">
            <h1
              className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${headerFont?.className}`}
            >
              Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for your ML needs. All plans include
              access to our core features.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center space-x-3 mb-12">
            <span
              className={
                annualBilling ? "text-gray-600" : "text-gray-900 font-medium"
              }
            >
              Monthly
            </span>
            <Switch
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
              className="data-[state=checked]:bg-indigo-600"
            />
            <span
              className={
                annualBilling ? "text-gray-900 font-medium" : "text-gray-600"
              }
            >
              Annual
            </span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Save 25%
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border ${
                  plan.popular
                    ? "border-indigo-500 ring-1 ring-indigo-500 shadow-lg"
                    : "border-gray-200"
                } p-8 relative flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>
                <p className="text-gray-500 mb-6">{plan.description}</p>
                <div className="mb-6">
                  {typeof plan.price === "number" ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="ml-2 text-gray-500">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </div>
                  )}
                  {typeof plan.price === "number" && (
                    <p className="text-gray-500 mt-1">
                      {annualBilling ? "Billed annually" : "Billed monthly"}
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : ""
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-20">
            <h2
              className={`text-3xl font-bold text-gray-900 text-center mb-8 ${headerFont?.className}`}
            >
              Compare Features
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left text-gray-900 font-medium border-b border-gray-200">
                      Feature
                    </th>
                    <th className="py-4 px-6 text-center text-gray-900 font-medium border-b border-gray-200">
                      Starter
                    </th>
                    <th className="py-4 px-6 text-center text-gray-900 font-medium border-b border-gray-200">
                      Pro
                    </th>
                    <th className="py-4 px-6 text-center text-gray-900 font-medium border-b border-gray-200">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "ML Models",
                      starter: "Up to 3",
                      pro: "Up to 10",
                      enterprise: "Unlimited",
                    },
                    {
                      feature: "API Calls",
                      starter: "50K / month",
                      pro: "500K / month",
                      enterprise: "Unlimited",
                    },
                    {
                      feature: "Model Templates",
                      starter: "Standard",
                      pro: "Advanced",
                      enterprise: "All + Custom",
                    },
                    {
                      feature: "Support",
                      starter: "Community",
                      pro: "Priority Email",
                      enterprise: "Dedicated Team",
                    },
                    {
                      feature: "Analytics",
                      starter: "Basic",
                      pro: "Advanced",
                      enterprise: "Advanced + Custom",
                    },
                    {
                      feature: "Custom Training",
                      starter: "—",
                      pro: "✓",
                      enterprise: "✓",
                    },
                    {
                      feature: "Team Collaboration",
                      starter: "—",
                      pro: "✓",
                      enterprise: "✓",
                    },
                    {
                      feature: "On-premises Deployment",
                      starter: "—",
                      pro: "—",
                      enterprise: "✓",
                    },
                    {
                      feature: "SLA Guarantees",
                      starter: "—",
                      pro: "—",
                      enterprise: "✓",
                    },
                  ].map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-left text-gray-900">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-600">
                        {row.starter}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-600">
                        {row.pro}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-600">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2
              className={`text-3xl font-bold text-gray-900 text-center mb-8 ${headerFont?.className}`}
            >
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-indigo-600 rounded-xl shadow-lg p-8 md:p-12 text-center">
            <h2
              className={`text-3xl font-bold text-white mb-4 ${headerFont?.className}`}
            >
              Not Sure Which Plan Is Right For You?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Our team can help you choose the perfect plan for your needs.
              Schedule a free consultation with one of our ML experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule a Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-indigo-700"
              >
                Contact Sales
              </Button>
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
