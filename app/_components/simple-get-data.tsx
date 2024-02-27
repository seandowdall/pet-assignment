"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// The Project interface remains the same
interface Project {
  id: string;
  projectName: string;
  projectStatus: string;
}

const SimpleGetData = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/items`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const jsonData = await res.json();
      // Check for the 'data' key in the JSON response
      if (jsonData && Array.isArray(jsonData.data)) {
        setData(jsonData.data); // Use the 'data' array from the response
      } else {
        throw new Error("Data is not in expected format");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10">
      <Button onClick={getData}>Fetch Data</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data.map((project) => (
          <li key={project.id}>
            {project.projectName} - {project.projectStatus}
          </li> // Display projectName and projectStatus
        ))}
      </ul>
    </div>
  );
};

export default SimpleGetData;
