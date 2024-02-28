"use client";

import React, { useState } from "react";
import PetCard from "./pet-card"; // Import PetCard component
import { Pet } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchById = () => {
  const [id, setId] = useState(""); // State to store the input ID
  const [results, setResults] = useState<Pet[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (!id) {
      setError("Please enter a valid ID.");
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/items/${id}`); // Use the id in the API request
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(Array.isArray(data) ? data : [data]); // Ensure results are in an array
    } catch (e) {
      setError("Failed to fetch the pet details.");
      console.error("There was an error!", e);
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)} // Update id state on change
          placeholder="Enter pet ID"
        />
        <Button onClick={handleSearch}>
          <Search />
        </Button>
      </div>

      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Render the pet cards in a grid */}
        {results.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default SearchById;
