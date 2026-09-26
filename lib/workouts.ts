export type Workout = {
  id: number;
  image: string;
  name: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sets: number;
  reps: string;
  // duration: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  description: string;
  instructions: string[];
};
