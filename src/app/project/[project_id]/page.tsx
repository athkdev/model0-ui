// app/project/[project_id]/page.tsx
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";
import Project from "../components/Project";

type Props = {
  params: { project_id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Fetch project data from your API
  const projectId = params.project_id;
  let projectName = "Project";
  const projectDescription = "View and manage your ML models in this project";

  try {
    const isDev = process.env.NODE_ENV === "development";
    const API_BASE = "http://localhost:8000";
    const url =
      (isDev ? API_BASE : "") +
      (!isDev ? "/v1" : "") +
      `/api/project/${projectId}`;
    const res = await axios.get(url);

    if (res.data) {
      projectName = res.data.name || projectName;
    }
  } catch (error) {
    console.error("Failed to fetch project for metadata:", error);
  }

  return {
    title: `m0 | ${projectName}`,
    description: projectDescription,
    openGraph: {
      title: projectName,
      description: projectDescription,
      images: ["/images/project-preview.jpg"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: projectName,
      description: projectDescription,
      images: ["/images/project-preview.jpg"],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function ProjectPage() {
  return <Project />;
}
