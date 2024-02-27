"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

async function getData(setData: any) {
  const res = await fetch("/api/pets");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  setData(data); // Update state with fetched data
}

const InputData = () => {
  const [data, setData] = useState(null);

  const handleGetData = () => {
    getData(setData).catch(console.error); // Fetch data and handle potential errors
  };

  return (
    <div>
      <Button onClick={handleGetData}>Get Data</Button>
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre> // Nicely format the JSON data for display
        ) : (
          "No data fetched yet."
        )}
      </div>
    </div>
  );
};

export default InputData;
