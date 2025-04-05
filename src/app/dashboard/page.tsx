// app/dashboard/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // You'll need to configure your environment variables in Next.js
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const handleSubmit = async () => {
    const userID = Cookies.get("USER_ID");

    await axios.post(`${API_BASE}api/project/create`, {
      user_id: userID,
      project_name: projectName,
      description: projectDescription,
    });

    fetchProjects();
  };

  const fetchProjects = async () => {
    try {
      const userID = Cookies.get("USER_ID");
      const response = await axios.get(
        `${API_BASE}api/project/?user_id=${userID}`,
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const openProject = (projectId: string) => {
    console.log("Opening project:", projectId);
    const projectUrl = `/project/${projectId}`;
    window.open(projectUrl, "_blank");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-neutral-800 relative overflow-hidden text-black"
      ref={containerRef}
    >
      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-white min-h-[45rem] my-10 shadow-md rounded px-8 py-6 transition">
          <div className="w-full flex justify-between mb-10">
            <h2 className="text-5xl font-semibold align-middle">My Projects</h2>
          </div>

          <Dialog>
            <DialogTrigger className="p-2 rounded align-middle underline transform underline-offset-4 hover:-translate-y-1 transition">
              {/* <Button className="p-2 rounded align-middle underline transform underline-offset-4 hover:-translate-y-1 transition">
              </Button> */}
              Create a project
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new project</DialogTitle>
                <DialogDescription>
                  put a name on it! you&apos;ll be able to create multiple
                  models inside a project.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="projectName"
                      className="font-semibold block mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="font-semibold block mb-2"
                    >
                      Description
                    </label>
                    <Textarea
                      id="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full"
                      rows={3}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </form>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>

                <div className="flex justify-end gap-2">
                  <Button type="submit">Create</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {projects.length === 0 ? (
            <div className="text-center text-gray-500">
              No projects yet. Create your first project!
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded p-4 transition"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Created: {formatDate(project.created_at)}
                    </span>
                    <Button onClick={() => openProject(project.id)}>
                      Open project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
