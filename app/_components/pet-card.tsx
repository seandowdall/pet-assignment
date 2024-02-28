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

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditForm = () => setIsEditing(!isEditing);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{pet.name}</CardTitle>
          <CardDescription>{pet.description}</CardDescription>
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

            <DeleteAlertDialog />
          </div>
        </CardFooter>
      </Card>
      {isEditing && <EditPetForm pet={pet} onClose={toggleEditForm} />}
    </div>
  );
};

export default PetCard;
