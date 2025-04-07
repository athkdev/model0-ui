// app/dashboard/page.tsx

import type { Metadata } from "next";
import Dashboard from "@/components/my/DashboardPage/Dashboard";

export const metadata: Metadata = {
  title: "m0 | Your Models",
  description:
    "Manage your machine learning projects in one place. Create, view, and organize your ML models efficiently.",
  keywords:
    "machine learning, ML models, project management, data science dashboard",
  openGraph: {
    title: "ML Project Dashboard",
    description:
      "Organize and manage your machine learning projects and models",
    images: ["/images/dashboard-preview.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Project Dashboard",
    description:
      "Organize and manage your machine learning projects and models",
    // images: ["/images/dashboard-preview.jpg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-800 relative overflow-hidden text-black">
      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-white min-h-[45rem] my-10 shadow-md rounded px-8 py-6 transition">
          <div className="w-full flex justify-between mb-10">
            <h2 className="text-5xl font-extralight text-neutral-600 align-middle">
              My Projects
            </h2>
          </div>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
