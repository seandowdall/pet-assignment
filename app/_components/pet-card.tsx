"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pet } from "@/types/type";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import EditPetForm from "./edit-pet-form";
import DeleteAlertDialog from "./delete-alert-dialog";
import Image from "next/image";

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditForm = () => setIsEditing(!isEditing);

  const deletePet = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/items/${pet.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the pet.");
      }

      // Optionally refresh the list of pets here or navigate away
      alert("Pet deleted successfully.");
    } catch (error) {
      alert((error as Error).message);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{pet.name}</CardTitle>
          <CardDescription>{pet.description}</CardDescription>
          {pet.images &&
            pet.images.map((image, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                {image.url ? (
                  <img
                    width={200}
                    height={200}
                    src={image.url}
                    alt={image.description || "Pet image"}
                    style={{ borderRadius: "8px" }}
                  />
                ) : (
                  <p>Image URL is missing</p>
                )}
              </div>
            ))}
        </CardHeader>
        <CardContent>
          <ul>
            <li>{pet.breed}</li>
            <li>{pet.weight}</li>
            <li>{pet.gender}</li>
            <li>{pet.color}</li>
          </ul>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row space-x-6">
            <Button variant={"outline"} onClick={toggleEditForm}>
              <PencilIcon />
            </Button>

            <DeleteAlertDialog onDeleteConfirm={deletePet} />
          </div>
        </CardFooter>
      </Card>
      {isEditing && <EditPetForm pet={pet} onClose={toggleEditForm} />}
    </div>
  );
};

export default PetCard;
