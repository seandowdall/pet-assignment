"use client";

import { Button } from "@/components/ui/button";
import { Pet } from "@/types/type";
import React, { useEffect, useState } from "react";

const SimpleGetData = () => {
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiUrl}/items`);
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
        {data.map((pet) => (
          <li key={pet.id}>
            {pet.name ? pet.name : "No Name"} -{" "}
            {pet.breed ? pet.breed : "No Breed"}
          </li> // Display projectName and projectStatus, with defaults for missing data
        ))}
      </ul>
    </div>
  );
};

export default SimpleGetData;
