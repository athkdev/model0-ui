"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ModelCard from "@/components/my/ModelCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  async function fetchProjectData() {
    try {
      const response = await axios.get(`/v1/api/project/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }

  async function fetchModels() {
    try {
      const response = await axios.get(
        `/v1/api/model/?project_id=${projectId}`,
      );
      setModels(response.data);
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  }

  async function handleCreateModel(e) {
    e.preventDefault();

    // const userID = Cookies.get("USER_ID");

    await axios.post(`/v1/api/model/create/`, {
      model_name: modelName,
      description: modelDescription,
      project_id: projectId,
      model_type: modelType,
    });

    // Reset form fields
    setModelName("");
    setModelDescription("");
    setModelType(null);

    // Refresh models list
    fetchModels();
  }

  useEffect(() => {
    fetchProjectData();
    fetchModels();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col gap-10 sm:gap-0 sm:flex-row justify-between items-center">
          <h2 className="text-7xl font-semibold text-gray-800">Your Models</h2>
        </div>

        <Dialog>
          <DialogTrigger className="w-full sm:w-auto">
            Create New Model
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
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
                    <Button variant="link" type="button">
                      Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
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
