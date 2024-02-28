import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { Pet } from "@/types/type"; // Adjust the import path as needed

interface EditPetFormProps {
  pet: Pet;
  onClose: () => void;
}

const EditPetForm: React.FC<EditPetFormProps> = ({ pet, onClose }) => {
  // State to track form input values
  const [formValues, setFormValues] = useState({
    name: pet.name,
    // Initialize other fields as needed, e.g., breed, weight
  });

  // Added state for tracking submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Now correctly defined, so this line will work
    try {
      const response = await fetch(
        `https://gvkby53kz9.execute-api.eu-west-1.amazonaws.com/items/${pet.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update pet information");
      }

      alert("Pet information updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Update Error: ${error.message}`);
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
      onClose(); // Ensure this is called to close the form regardless of outcome
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full"
        />
      </div>
      {/* Include input fields for other properties as needed */}
      <div className="flex justify-between">
        <Button type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
        <Button onClick={() => onClose()} variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditPetForm;
