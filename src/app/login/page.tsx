import type { Metadata } from "next";
import Login from "./components/Login";

export const metadata: Metadata = {
  title: "m0 | Login",
  description:
    "Sign in to your account to access personalized features and manage your profile.",
  keywords: ["login", "sign in", "authentication", "account access"],
  openGraph: {
    title: "Login to Your App Name",
    description:
      "Sign in to your account to access personalized features and manage your profile.",
    url: `${process.env.NEXT_PUBLIC_API_BASE}login`,
    siteName: "Model-0",
    // images: [
    //   {
    //     url: "https://yourapp.com/og-login-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Login to Your App Name",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <Login />;
}
