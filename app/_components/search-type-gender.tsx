"use client";

import React, { useState } from "react";
import PetCard from "./pet-card"; // Import PetCard component
import { Pet } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchTypeGender = () => {
  const [type, setType] = useState("Dog");
  const [gender, setGender] = useState("Male");
  const [results, setResults] = useState<Pet[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      console.log(`${apiUrl}/available-pets?type=${type}&gender=${gender}`);
      const response = await fetch(
        `${apiUrl}/available-pets-type-gender?type=${type}&gender=${gender}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (e) {
      setError("Failed to fetch available pets.");
      console.error("There was an error!", e);
    }
  };

  return (
    <div>
      <div className=" flex flex-row space-x-5 items-center">
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
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* ... other statuses ... */}
          </select>
        </label>
        <Button onClick={handleSearch}>
          <Search />
        </Button>
      </div>

      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* This will render the pet cards in a 3-column grid on medium screens and above */}
        {results.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default SearchTypeGender;
