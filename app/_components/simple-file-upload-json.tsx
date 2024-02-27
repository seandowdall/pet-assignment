"use client";

import React, { useState } from "react";

interface ProjectFormData {
  id: string;
  projectName: string;
  projectStatus: string;
}

const SimpleFileUploadJson = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const file = e.target.files[0];
        const text = await file.text();
        const jsonObjects = JSON.parse(text);

        for (const jsonObject of jsonObjects) {
          const response = await fetch(
            "https://gvkby53kz9.execute-api.eu-west-1.amazonaws.com/items",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonObject),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Failed to submit file data: ${response.status} ${response.statusText} - ${errorText}`
            );
          }
        }

        alert("All file data submitted successfully");
      } catch (error) {
        if (error instanceof Error) {
          setSubmitError(`File Error: ${error.message}`);
        } else {
          setSubmitError("An unexpected error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="fileInput">Upload your JSON file</label>
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={handleFileChange}
            accept=".json"
          />
        </div>
      </form>
      {isSubmitting && <p>Submitting...</p>}
      {submitError && <p>Error: {submitError}</p>}
    </div>
  );
};

export default SimpleFileUploadJson;
