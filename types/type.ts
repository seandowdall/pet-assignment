export interface HealthStatus {
  vaccinations: boolean;
  spayedNeutered: boolean;
  dewormed: boolean;
  microchipped: boolean;
  conditions: string[];
  allergies: string[];
  medications: Medication[];
  veterinarian: Veterinarian;
}

export interface Medication {
  name: string;
  dosage: string;
  startDate: string;
  endDate: string;
}

export interface Veterinarian {
  name: string;
  clinic: string;
  contact: string;
}

export interface BehavioralTraits {
  goodWithChildren: boolean;
  goodWithPets: boolean;
  houseTrained: boolean;
  specialNeeds: string;
  training: string[];
  temperament: string[];
}

export interface History {
  rescueDate: string;
  rescueLocation: string;
  previousAdoptions: number;
  surrenderReason: string;
}

export interface Image {
  url: string;
  description: string;
}

export interface Shelter {
  shelterId: string;
  name: string;
  location: string;
  contact: {
    phone: string;
    email: string;
  };
}

export interface Adopter {
  adopterId: string;
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  preference: {
    petType: string[];
    breed: string[];
    age: string[];
  };
  homeEnvironment: {
    homeType: string;
    yard: string;
    otherPets: string;
  };
}

export interface SocialMedia {
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  color: string;
  weight: number;
  healthStatus: HealthStatus;
  behavioralTraits: BehavioralTraits;
  history: History;
  images: Image[];
  description: string;
  shelter: Shelter;
  adoptionStatus: string;
  interestedAdopters: Adopter[];
  socialMedia: SocialMedia;
}
