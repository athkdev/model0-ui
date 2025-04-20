"use client";

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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [projects, setProjects] = useState<any>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async () => {
    const userID = Cookies.get("USER_ID");

    const isDev = process.env.NODE_ENV === "development";
    const API_BASE = "http://localhost:8000";
    const res = await axios.post(
      (isDev ? API_BASE : "") + `/v1/api/project/create`,
      {
        user_id: userID,
        project_name: projectName,
        description: projectDescription,
      },
    );

    fetchProjects();
  };

  const fetchProjects = async () => {
    try {
      const userID = Cookies.get("USER_ID");
      const isDev = process.env.NODE_ENV === "development";
      const API_BASE = "http://localhost:8000";
      const response = await axios.get(
        (isDev ? API_BASE : "") + `/v1/api/project/?user_id=${userID}`,
      );
      console.log(response.data);
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
    <>
      <Dialog>
        <DialogTrigger className="p-2 mb-5 rounded align-middle underline transform underline-offset-4 hover:-translate-y-1 transition">
          {/* <Button className="p-2 rounded align-middle underline transform underline-offset-4 hover:-translate-y-1 transition">
              </Button> */}
          Create a project
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>
              put a name on it! you&apos;ll be able to create multiple models
              inside a project.
            </DialogDescription>
          </DialogHeader>

          <form>
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
              <Button onClick={() => handleSubmit()} type="submit">
                Create
              </Button>
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
          {projects.map((project: any) => (
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
                <Button
                  variant={"link"}
                  onClick={() => openProject(project.id)}
                  className="cursor-pointer transition hover:-translate-y-1.5 hover:italic"
                >
                  Open project
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
