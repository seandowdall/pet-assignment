import React from "react";
import PetCard from "./pet-card";

const pets = [
  // This should be your dynamic data, but here's an example structure
  {
    name: "Max",
    type: "Dog",
    breed: "Labrador",
    age: "5",
    gender: "Male",
    color: "Black",
  },
  {
    name: "Bella",
    type: "Cat",
    breed: "Siamese",
    age: "3",
    gender: "Female",
    color: "White",
  },
  // Add more pets as needed
];

const DisplayAllCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {pets.map((pet, index) => (
        <PetCard key={index} pet={pet} />
      ))}
    </div>
  );
};

export default DisplayAllCards;
