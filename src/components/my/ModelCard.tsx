// components/ModelCard.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface ModelProps {
  id: number;
  name: string;
  description: string;
  created_at: string;
  is_deployed: boolean;
  endpoint_name: string;
}

interface ModelCardProps {
  model: ModelProps;
  fetchModels: () => void;
}

export default function ModelCard({ model, fetchModels }: ModelCardProps) {
  const [modelStatus, setModelStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState<Record<number, boolean>>({});

  // You'll need to configure your environment variables in Next.js
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  // Define constants (replace with your actual values)
  const constants = {
    POLLING_INTERVAL: 5000, // 5 seconds
  };

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const intermediateStateResponses = [
    "Creating",
    "Deleting",
    "Updating",
    "SystemUpdating",
    "RollingBack",
  ];

  async function copyModelId(modelId: number) {
    try {
      await navigator.clipboard.writeText(modelId.toString());
      setCopyStatus((prev) => ({ ...prev, [modelId]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [modelId]: false }));
      }, 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  async function pollStatus(model: ModelProps) {
    try {
      const response = await axios.get(
        `${API_BASE}api/model/endpoint/?endpoint_name=${model.endpoint_name}`
      );
      const endpointStatus = response.data.endpoint_status;

      console.log(endpointStatus);

      setModelStatus(endpointStatus);

      if (!intermediateStateResponses.includes(endpointStatus)) {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }

        fetchModels();
      }
    } catch (e) {
      console.error("PollingError: ", e);
      setModelStatus("Inactive");

      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }

      fetchModels();
    }
  }

  async function toggleModelStatus(model: ModelProps) {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    if (!model.is_deployed) {
      await axios.post(`${API_BASE}api/model/deploy/`, {
        model_id: model.id,
      });
    } else {
      await axios.post(`${API_BASE}api/model/withdraw/`, {
        model_id: model.id,
      });
    }

    pollIntervalRef.current = setInterval(
      () => pollStatus(model),
      constants.POLLING_INTERVAL
    );
  }

  useEffect(() => {
    async function checkInitialStatus() {
      if (!model.endpoint_name) {
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE}api/model/endpoint/?endpoint_name=${model.endpoint_name}`
        );
        const status = response.data.endpoint_status;

        setModelStatus(status);

        if (intermediateStateResponses.includes(status)) {
          pollIntervalRef.current = setInterval(
            () => pollStatus(model),
            constants.POLLING_INTERVAL
          );
        }
      } catch (error) {
        console.error("Failed to get initial status:", error);
        setModelStatus("Inactive");
      }
    }

    checkInitialStatus();

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [model.endpoint_name]);

  function getModelLabelColor(status: string) {
    if (status === "Creating") {
      return "text-amber-700 bg-amber-100";
    } else if (status === "InService") {
      return "text-green-700 bg-green-100";
    } else if (status === "OutOfService") {
      return "text-red-700 bg-red-100";
    } else if (status === "Updating") {
      return "text-red-700 bg-red-100";
    } else if (status === "Failed") {
      return "text-red-700 bg-red-100";
    } else if (status === "Deleting") {
      return "text-red-700 bg-red-100";
    } else {
      return "text-neutral-700 bg-neutral-100";
    }
  }

  function getButtonText(model: ModelProps) {
    return model.is_deployed ? "Undeploy" : "Deploy";
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:scale-105">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${getModelLabelColor(
            modelStatus
          )}`}
        >
          {modelStatus ? modelStatus : "Inactive"}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{model.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Created: {new Date(model.created_at).toLocaleDateString()}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => copyModelId(model.id)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {copyStatus[model.id] ? "Copied" : "Copy ID"}
        </button>
        <Button
          onClick={() => toggleModelStatus(model)}
          className={`font-semibold py-2 px-4 rounded ${
            !model.is_deployed ? "text-black" : "text-white"
          }`}
          // filled={model.is_deployed}
        >
          {getButtonText(model)}
        </Button>
      </div>
    </div>
  );
}
