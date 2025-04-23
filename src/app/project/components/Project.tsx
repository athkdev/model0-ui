"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ModelCard from "@/components/my/ModelCard";
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
import Cookies from "js-cookie";

export default function Project() {
  const params = useParams();
  const projectId = params.project_id;

  const [project, setProject] = useState(null);
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [modelType, setModelType] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isDev = process.env.NODE_ENV === "development";
  const API_BASE = "http://localhost:8000";

  async function fetchProjectData() {
    try {
      const response = await axios.get(
        (isDev ? API_BASE : "") + `/v1/api/project/${projectId}`,
      );
      setProject(response.data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }

  async function fetchModels() {
    try {
      const response = await axios.get(
        (isDev ? API_BASE : "") + `/v1/api/model/?project_id=${projectId}`,
      );
      setModels(response.data);
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  }

  async function handleCreateModel(e) {
    e.preventDefault();

    try {
      // const userID = Cookies.get("USER_ID");

      const isDev = process.env.NODE_ENV === "development";
      const API_BASE = "http://localhost:8000";

      await axios.post((isDev ? API_BASE : "") + `/v1/api/model/create/`, {
        model_name: modelName,
        description: modelDescription,
        project_id: projectId,
        model_type: modelType,
      });

      setModelName("");
      setModelDescription("");
      setModelType(null);

      fetchModels();

      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to create model:", error);
    }
  }

  useEffect(() => {
    fetchProjectData();
    fetchModels();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col gap-10 sm:gap-0 sm:flex-row justify-between items-center">
          <h2 className="text-5xl font-extralight text-neutral-600 align-middle">
            My Models
          </h2>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            onChange={() => setDialogOpen(true)}
            className="w-full sm:w-auto border p-2 rounded-lg transition cursor-pointer hover:-translate-y-1"
          >
            Create a Model
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a model</DialogTitle>
              <DialogDescription>
                go change the world with AI : )
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateModel}>
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <label
                    htmlFor="modelName"
                    className="font-semibold block mb-2"
                  >
                    Model Name
                  </label>
                  <Input
                    id="modelName"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    className="w-full"
                    autoComplete="off"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="modelDescription"
                    className="font-semibold block mb-2"
                  >
                    Model Description
                  </label>
                  <Textarea
                    id="modelDescription"
                    value={modelDescription}
                    onChange={(e) => setModelDescription(e.target.value)}
                    className="w-full"
                    rows={3}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modelType"
                    className="font-semibold block mb-2"
                  >
                    Model Type
                  </label>
                  {/* <Dropdown
                        id="modelType"
                        value={modelType}
                        onChange={(e) => setModelType(e.value)}
                        options={modelTypes}
                        optionLabel="name"
                        placeholder="Select a model type"
                        className="w-full"
                      /> */}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button variant="link" type="button">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button type="submit">Create</Button>
                </DialogFooter>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <div key={model.id}>
              <ModelCard model={model} fetchModels={fetchModels} />
            </div>
          ))}
        </div>

        {models.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No models yet. Create your first model!
          </div>
        )}
      </div>
    </div>
  );
}
