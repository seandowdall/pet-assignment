"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface ProjectFormData {
  id: string;
  projectName: string;
  projectStatus: string;
}

const SimpleRawJson = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    id: "",
    projectName: "",
    projectStatus: "",
  });
  const [rawJsonInput, setRawJsonInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Existing handlers and functions...

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawJsonInput(e.target.value);
  };

  const handleJsonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Parse the input to ensure it is valid JSON
      const jsonData = JSON.parse(rawJsonInput);
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit JSON data");
      }

      // Handle success response
      alert("JSON Data submitted successfully");
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(`JSON Error: ${error.message}`);
      } else {
        setSubmitError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Existing JSX...

  return (
    <div>
      {/* Existing form for ProjectFormData */}

      <form onSubmit={handleJsonSubmit}>
        <div>
          <label htmlFor="jsonInput">Paste your JSON here</label>
          <textarea
            id="jsonInput"
            name="jsonInput"
            value={rawJsonInput}
            onChange={handleJsonChange}
            rows={10}
            cols={50}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit JSON
        </Button>
      </form>
      {isSubmitting && <p>Submitting...</p>}
      {submitError && <p>Error: {submitError}</p>}
    </div>
  );
};

export default SimpleRawJson;
