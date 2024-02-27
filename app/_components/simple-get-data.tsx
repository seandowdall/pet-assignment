"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

// Updated Project interface to mark projectName and projectStatus as optional
interface Project {
  id: string;
  projectName?: string;
  projectStatus?: string;
}

const SimpleGetData = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://gvkby53kz9.execute-api.eu-west-1.amazonaws.com/items`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const jsonData = await res.json();
      if (jsonData && Array.isArray(jsonData)) {
        // Directly use jsonData as it is the expected array of projects
        setData(jsonData);
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
            {project.projectName ? project.projectName : "No Name"} -{" "}
            {project.projectStatus ? project.projectStatus : "No Status"}
          </li> // Display projectName and projectStatus, with defaults for missing data
        ))}
      </ul>
    </div>
  );
};

export default SimpleGetData;
