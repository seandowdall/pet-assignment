import React from "react";
import Image from "next/image";
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
import { PencilIcon, Trash } from "lucide-react";

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
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
            <Button variant={"outline"}>
              <PencilIcon />
            </Button>

            <Button variant={"destructive"}>
              <Trash />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PetCard;
