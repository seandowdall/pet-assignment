import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";

interface Pet {
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  color: string;
}

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{pet.name}</CardTitle>
          <CardDescription>{pet.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>{pet.breed}</li>
            <li>{pet.age}</li>
            <li>{pet.gender}</li>
            <li>{pet.color}</li>
          </ul>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PetCard;
