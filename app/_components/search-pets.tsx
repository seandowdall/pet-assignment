"use client";

import { Pet } from "@/types/type";
import React, { useState } from "react";

const SearchPets = () => {
  const [type, setType] = useState("Dog");
  const [status, setStatus] = useState("Available");
  const [results, setResults] = useState<Pet[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    try {
      const response = await fetch(
        `https://gvkby53kz9.execute-api.eu-west-1.amazonaws.com/available-pets?type=${type}&status=${status}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (e) {
      setError("Failed to fetch available dogs.");
      console.error("There was an error!", e);
    }
  };

  return (
    <div>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          {/* ... other types ... */}
        </select>
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Available">Available</option>
          {/* ... other statuses ... */}
        </select>
      </label>
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <div>
        {/* Render your results here */}
        {results.map((pet, index) => (
          <div key={index}>
            {/* Display pet details */}
            <p>{pet.name}</p>
            {/* ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPets;
