import SignUp from "./components/Signup";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "m0 | Sign Up",
  description:
    "Create an account to get started and access all features of Your App Name.",
  keywords: ["sign up", "create account", "register", "join"],
  openGraph: {
    title: "Sign Up for Your App Name",
    description:
      "Create an account to get started and access all features of Your App Name.",
    url: `${process.env.NEXT_PUBLIC_API_BASE}signup`,
    siteName: "Your App Name",
    // images: [
    //   {
    //     url: "https://yourapp.com/og-signup-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Sign Up for Your App Name",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  // Robots
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignUpPage() {
  return <SignUp />;
}
