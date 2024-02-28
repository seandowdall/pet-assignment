"use client";

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

      const response = await fetch(
        "https://gvkby53kz9.execute-api.eu-west-1.amazonaws.com/items",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

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
        <button type="submit" disabled={isSubmitting}>
          Submit JSON
        </button>
      </form>
      {isSubmitting && <p>Submitting...</p>}
      {submitError && <p>Error: {submitError}</p>}
    </div>
  );
};

export default SimpleRawJson;
