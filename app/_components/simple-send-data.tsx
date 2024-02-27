"use client";

import React, { useState } from "react";

interface ProjectFormData {
  id: string; // Add this line
  projectName: string;
  projectStatus: string;
}

const SimpleSendData = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    id: "", // Add this line
    projectName: "",
    projectStatus: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(
        "https://gvkby53kz9.execute-api.eu-west-1.amazonaws.com/items",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Handle success response
      alert("Data submitted successfully");
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="projectStatus">Project Status</label>
          <input
            type="text"
            id="projectStatus"
            name="projectStatus"
            value={formData.projectStatus}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      {isSubmitting && <p>Submitting...</p>}
      {submitError && <p>Error: {submitError}</p>}
    </div>
  );
};

export default SimpleSendData;
