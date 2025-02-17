export enum RoleEnum {
  User,
  Member,
  Consultant,
  Admin
}

// Setup - Goal
export enum GenderEnum {
  Male,
  Female
}

export enum GoalEnum {
  WeightLoss,
  Maintenance,
  WeightGain,
  MuscleGain
}

export enum CategoryEnum {
  Food,
  Workout
}

// Food - Meal
export enum FoodEnum {
  Carbs,
  Protein,
  Vegetables,
  Soup,
  Dessert,
  Drink,
  Snacks
}

export enum MealEnum {
  Breakfast,
  Lunch,
  Dinner,
  Snack
}

export enum DishEnum {
  MainDish,
  SideDish,
  Soup,
  Dessert,
  Drink
}

// Exercise - Workout
export enum ExerciseEnum {
  Time,
  Reps
}

export enum DifficultyEnum {
  Easy,
  Medium,
  Hard
}

// export enum WorkoutEnum {
//   FullBody,
//   UpperBody,
//   LowerBody,
//   Abs
// }

// Schedule - Service - Booking
// export enum ServiceEnum {
//   Online,
//   Offline
// }

export enum ScheduleEnum {
  Available,
  Unavailable,
  Booked
}

export enum BookingEnum {
  Pending,
  Confirmed,
  Cancelled
}
