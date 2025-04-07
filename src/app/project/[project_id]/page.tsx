// app/project/[project_id]/page.tsx
import Project from "@/components/my/ProjectPage/Project";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { project_id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch project data from your API
  const projectId = params.project_id;
  let projectName = "Project";
  const projectDescription = "View and manage your ML models in this project";

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  try {
    const res = await axios.get(`${API_BASE}api/project/${projectId}`);

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
